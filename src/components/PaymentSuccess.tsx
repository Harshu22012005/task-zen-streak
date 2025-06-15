
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const PaymentSuccess = () => {
  useEffect(() => {
    toast.success('Payment successful! Premium features activated!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl text-green-700 dark:text-green-400">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className="text-gray-600 dark:text-gray-400">
              Thank you for upgrading to Premium!
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              Your premium features are now active
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl space-y-3">
            <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
              <Crown className="w-5 h-5" />
              <span className="font-semibold">Premium Features Unlocked:</span>
            </div>
            <div className="text-left space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>AI-Powered Smart Themes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Exclusive Color Schemes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Advanced AI Suggestions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Priority Task Processing</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/dashboard">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="w-full">
                Explore Premium Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
