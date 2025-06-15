
-- Add premium-related columns to user_stats table
ALTER TABLE public.user_stats 
ADD COLUMN is_premium BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN premium_activated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN payment_transaction_id TEXT;

-- Create an index on payment_transaction_id for faster lookups
CREATE INDEX idx_user_stats_payment_transaction_id ON public.user_stats(payment_transaction_id);
