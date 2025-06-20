
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export interface AudioFile {
  id: string;
  name: string;
  url: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

export const useAudioFiles = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadAudioFiles();
    }
  }, [user]);

  const loadAudioFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('audio_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading audio files:', error);
        return;
      }

      const filesWithUrls = await Promise.all(
        data.map(async (file) => {
          const { data: urlData } = await supabase.storage
            .from('audio-files')
            .createSignedUrl(file.storage_path, 3600); // 1 hour expiry

          return {
            id: file.id,
            name: file.original_name.replace(/\.[^/.]+$/, ""),
            url: urlData?.signedUrl || '',
            file_size: file.file_size,
            mime_type: file.mime_type,
            created_at: file.created_at
          };
        })
      );

      setAudioFiles(filesWithUrls.filter(file => file.url));
    } catch (error) {
      console.error('Error loading audio files:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadAudioFile = async (file: File) => {
    if (!user) {
      toast.error("Please login to upload audio files");
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('audio-files')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Save metadata to database
      const { data, error: dbError } = await supabase
        .from('audio_files')
        .insert({
          user_id: user.id,
          filename: fileName.split('/').pop() || '',
          original_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: fileName
        })
        .select()
        .single();

      if (dbError) {
        throw dbError;
      }

      // Reload audio files
      await loadAudioFiles();
      toast.success("Audio file uploaded successfully!");
      
    } catch (error) {
      console.error('Error uploading audio file:', error);
      toast.error("Failed to upload audio file");
    }
  };

  const deleteAudioFile = async (id: string) => {
    try {
      // Get file info first
      const { data: fileData, error: fetchError } = await supabase
        .from('audio_files')
        .select('storage_path')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('audio-files')
        .remove([fileData.storage_path]);

      if (storageError) {
        throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('audio_files')
        .delete()
        .eq('id', id);

      if (dbError) {
        throw dbError;
      }

      // Reload audio files
      await loadAudioFiles();
      toast.success("Audio file deleted successfully!");
      
    } catch (error) {
      console.error('Error deleting audio file:', error);
      toast.error("Failed to delete audio file");
    }
  };

  return {
    audioFiles,
    loading,
    uploadAudioFile,
    deleteAudioFile,
    refreshAudioFiles: loadAudioFiles
  };
};
