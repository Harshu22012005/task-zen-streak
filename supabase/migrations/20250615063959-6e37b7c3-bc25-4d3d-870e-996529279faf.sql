
-- Create tasks table to store user tasks
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_stats table to track points and streaks
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL UNIQUE,
  points INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks table
CREATE POLICY "Users can view their own tasks" 
  ON public.tasks 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks" 
  ON public.tasks 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" 
  ON public.tasks 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" 
  ON public.tasks 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for user_stats table
CREATE POLICY "Users can view their own stats" 
  ON public.user_stats 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" 
  ON public.user_stats 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" 
  ON public.user_stats 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create function to automatically create user stats when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create user stats
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update streaks and points
CREATE OR REPLACE FUNCTION public.update_user_progress(task_completed boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_stats_record user_stats%ROWTYPE;
  today_date DATE := CURRENT_DATE;
BEGIN
  -- Get current user stats
  SELECT * INTO user_stats_record
  FROM user_stats
  WHERE user_id = auth.uid();
  
  IF NOT FOUND THEN
    -- Create stats record if it doesn't exist
    INSERT INTO user_stats (user_id, points, current_streak, longest_streak, last_activity_date)
    VALUES (auth.uid(), 0, 0, 0, today_date);
    
    SELECT * INTO user_stats_record
    FROM user_stats
    WHERE user_id = auth.uid();
  END IF;
  
  IF task_completed THEN
    -- Add points for completing a task
    UPDATE user_stats
    SET 
      points = points + 10,
      last_activity_date = today_date,
      updated_at = now()
    WHERE user_id = auth.uid();
    
    -- Update streak if this is a new day
    IF user_stats_record.last_activity_date IS NULL OR user_stats_record.last_activity_date < today_date THEN
      -- Check if streak should continue (completed task yesterday or today)
      IF user_stats_record.last_activity_date = today_date - INTERVAL '1 day' OR user_stats_record.last_activity_date = today_date THEN
        UPDATE user_stats
        SET 
          current_streak = current_streak + 1,
          longest_streak = GREATEST(longest_streak, current_streak + 1)
        WHERE user_id = auth.uid();
      ELSE
        -- Reset streak if more than a day has passed
        UPDATE user_stats
        SET 
          current_streak = 1,
          longest_streak = GREATEST(longest_streak, 1)
        WHERE user_id = auth.uid();
      END IF;
    END IF;
  END IF;
END;
$$;
