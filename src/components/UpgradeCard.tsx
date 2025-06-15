
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Palette, Brain, Zap, Crown, Check, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const UpgradeCard = () => {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const { user } = useAuth();

  const upiId = "dailytasker@paytm"; // Replace with your actual UPI ID
  const amount = "9";
  
  const paymentMethods = [
    {
      id: 'paytm',
      name: 'Paytm',
      logo: '📱',
      color: 'bg-blue-500',
      url: `paytmmp://pay?pa=${upiId}&pn=DailyTasker&am=${amount}&cu=INR&tn=Premium Upgrade`
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      logo: '🌟',
      color: 'bg-green-500',
      url: `tez://upi/pay?pa=${upiId}&pn=DailyTasker&am=${amount}&cu=INR&tn=Premium Upgrade`
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      logo: '💜',
      color: 'bg-purple-600',
      url: `phonepe://pay?pa=${upiId}&pn=DailyTasker&am=${amount}&cu=INR&tn=Premium Upgrade`
    }
  ];

  const handlePaymentSelect = (method: typeof paymentMethods[0]) => {
    setSelectedPayment(method.id);
    
    // Try to open the app-specific payment URL
    const link = document.createElement('a');
    link.href = method.url;
    link.click();
    
    // Show payment details as fallback
    setShowPaymentDetails(true);
    toast.success(`Opening ${method.name}...`);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    toast.success('UPI ID copied to clipboard!');
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

        {!showPaymentDetails ? (
          /* Payment Method Selection */
          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Choose Payment Method:
            </div>
            {paymentMethods.map((method) => (
              <Button
                key={method.id}
                onClick={() => handlePaymentSelect(method)}
                className={`w-full justify-start text-left p-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300 ${method.color}`}
              >
                <span className="text-2xl mr-3">{method.logo}</span>
                <span>Pay with {method.name}</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </Button>
            ))}
          </div>
        ) : (
          /* Payment Details */
          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Complete Payment
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Pay ₹9 to the UPI ID below
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">UPI ID</div>
                <div className="font-mono font-semibold text-gray-800 dark:text-gray-200">{upiId}</div>
              </div>
              <Button
                onClick={copyUpiId}
                variant="outline"
                size="sm"
                className="ml-2"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                After payment, send screenshot to activate premium features
              </div>
              <Button
                onClick={() => setShowPaymentDetails(false)}
                variant="outline"
                className="w-full"
              >
                Try Different Payment Method
              </Button>
            </div>
          </div>
        )}

        {!user && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Please login to upgrade your account
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Secure UPI payment</span>
        </div>
      </CardContent>
    </Card>
  );
};
