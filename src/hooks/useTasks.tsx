
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
  createdAt: Date;
  user_id: string;
}

const sendTaskNotification = async (userEmail: string, taskTitle: string, action: 'created' | 'completed') => {
  try {
    const response = await fetch('/api/send-task-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail,
        taskTitle,
        action,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notification');
    }
  } catch (error) {
    console.error('Error sending task notification:', error);
  }
};

export const useTasks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.map(task => ({
        id: task.id,
        title: task.title,
        completed: task.completed,
        priority: task.priority as 'low' | 'medium' | 'high',
        dueTime: task.due_time,
        createdAt: new Date(task.created_at),
        user_id: task.user_id,
      }));
    },
    enabled: !!user,
  });

  const { data: emailPreferences } = useQuery({
    queryKey: ['email_preferences', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('email_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return data;
    },
    enabled: !!user,
  });

  const addTaskMutation = useMutation({
    mutationFn: async (taskData: { title: string; priority?: 'low' | 'medium' | 'high'; dueTime?: string }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          title: taskData.title,
          priority: taskData.priority || 'medium',
          due_time: taskData.dueTime,
          user_id: user.id,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      toast({
        title: "Task added!",
        description: "Your new task has been added to the list.",
      });

      // Send email notification if enabled
      if (emailPreferences?.email_updates && user?.email) {
        sendTaskNotification(user.email, data.title, 'created');
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update user progress when completing a task
      if (completed) {
        await supabase.rpc('update_user_progress', { task_completed: true });
      }

      return data;
    },
    onSuccess: (data, { completed }) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['user_stats', user?.id] });
      
      if (completed) {
        toast({
          title: "Task completed! 🎉",
          description: "+10 points earned!",
        });

        // Send email notification if enabled
        if (emailPreferences?.email_updates && user?.email) {
          sendTaskNotification(user.email, data.title, 'completed');
        }
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      toast({
        title: "Task deleted",
        description: "Task has been removed from your list.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete task. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    tasks,
    isLoading,
    addTask: addTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isAddingTask: addTaskMutation.isPending,
  };
};
