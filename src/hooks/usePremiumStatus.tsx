
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const usePremiumStatus = () => {
  const { user } = useAuth();

  const { data: premiumStatus, isLoading } = useQuery({
    queryKey: ['premium_status', user?.id],
    queryFn: async () => {
      if (!user) return { isPremium: false };
      
      const { data, error } = await supabase
        .from('user_stats')
        .select('is_premium, premium_activated_at, payment_transaction_id')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching premium status:', error);
        return { isPremium: false };
      }
      
      return {
        isPremium: data?.is_premium || false,
        activatedAt: data?.premium_activated_at,
        transactionId: data?.payment_transaction_id
      };
    },
    enabled: !!user,
  });

  return {
    isPremium: premiumStatus?.isPremium || false,
    activatedAt: premiumStatus?.activatedAt,
    transactionId: premiumStatus?.transactionId,
    isLoading
  };
};
