
-- Create email preferences table to track user notification settings
CREATE TABLE public.email_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  email_updates BOOLEAN NOT NULL DEFAULT false,
  push_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.email_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for email preferences
CREATE POLICY "Users can view their own email preferences" 
  ON public.email_preferences 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own email preferences" 
  ON public.email_preferences 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email preferences" 
  ON public.email_preferences 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create trigger to automatically create email preferences for new users
CREATE OR REPLACE FUNCTION public.handle_new_user_email_preferences()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.email_preferences (user_id, email_updates, push_notifications)
  VALUES (NEW.id, false, true);
  RETURN NEW;
END;
$function$;

-- Create trigger that fires when a new user is created
CREATE TRIGGER on_auth_user_created_email_prefs
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_email_preferences();
