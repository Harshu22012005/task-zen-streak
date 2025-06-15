
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface UserStats {
  points: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
}

export const useUserStats = () => {
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['user_stats', user?.id],
    queryFn: async (): Promise<UserStats> => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // If no stats exist, return defaults
        if (error.code === 'PGRST116') {
          return {
            points: 0,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: null,
          };
        }
        throw error;
      }
      
      return {
        points: data.points,
        current_streak: data.current_streak,
        longest_streak: data.longest_streak,
        last_activity_date: data.last_activity_date,
      };
    },
    enabled: !!user,
  });

  return {
    stats: stats || { points: 0, current_streak: 0, longest_streak: 0, last_activity_date: null },
    isLoading,
  };
};
