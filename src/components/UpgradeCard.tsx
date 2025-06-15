
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Palette, Brain, Zap, Crown, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const UpgradeCard = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handleUpgrade = async () => {
    if (!user) {
      toast.error('Please login to upgrade');
      return;
    }

    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-upgrade-checkout');
      
      if (error) throw error;
      
      if (data.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
        toast.success('Redirecting to payment...');
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast.error('Failed to start upgrade process. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    { icon: Brain, text: 'AI-Powered Smart Themes' },
    { icon: Palette, text: 'Exclusive Color Schemes' },
    { icon: Sparkles, text: 'Advanced AI Suggestions' },
    { icon: Zap, text: 'Priority Task Processing' },
    { icon: Crown, text: 'Premium Badge & Status' }
  ];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
      {/* Premium Badge */}
      <div className="absolute top-3 right-3">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
          <Crown className="w-3 h-3 mr-1" />
          PREMIUM
        </div>
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-gray-800 dark:text-gray-200">Upgrade to Premium</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-normal">
              Unlock AI themes & unique features
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Display */}
        <div className="text-center py-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">₹9</span>
            <span className="text-lg text-gray-500 line-through">₹99</span>
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
            🎉 Limited Time Offer - 90% OFF!
          </div>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            What you'll get:
          </div>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{feature.text}</span>
              <Check className="w-4 h-4 text-green-500 ml-auto" />
            </div>
          ))}
        </div>

        {/* Upgrade Button */}
        <Button 
          onClick={handleUpgrade}
          disabled={isProcessing || !user}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl py-3 text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Upgrade Now - ₹9 Only
            </>
          )}
        </Button>

        {!user && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Please login to upgrade your account
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Secure payment powered by Stripe</span>
        </div>
      </CardContent>
    </Card>
  );
};
