
-- Create a table to store uploaded audio files
CREATE TABLE public.audio_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.audio_files ENABLE ROW LEVEL SECURITY;

-- Create policies for audio files
CREATE POLICY "Users can view their own audio files" 
  ON public.audio_files 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own audio files" 
  ON public.audio_files 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own audio files" 
  ON public.audio_files 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own audio files" 
  ON public.audio_files 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('audio-files', 'audio-files', false);

-- Create storage policies
CREATE POLICY "Users can upload their own audio files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audio-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own audio files"
ON storage.objects FOR SELECT
USING (bucket_id = 'audio-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own audio files"
ON storage.objects FOR DELETE
USING (bucket_id = 'audio-files' AND auth.uid()::text = (storage.foldername(name))[1]);
