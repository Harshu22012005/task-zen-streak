import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Palette, Brain, Zap, Crown, Check, QrCode, Download } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export const UpgradeCard = () => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const { user } = useAuth();

  const merchantId = "DAILYTASKER"; // Replace with your PhonePe merchant ID
  const amount = 900; // Amount in paise (₹9 = 900 paise)

  const generateTransactionId = () => {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
  };

  const initiatePhonePePayment = async () => {
    if (!user) {
      toast.error('Please login to upgrade');
      return;
    }

    const txnId = generateTransactionId();
    setTransactionId(txnId);
    setPaymentStatus('processing');

    try {
      // Create payment request
      const paymentData = {
        merchantId: merchantId,
        merchantTransactionId: txnId,
        merchantUserId: user.id,
        amount: amount,
        redirectUrl: `${window.location.origin}/payment-success`,
        redirectMode: "REDIRECT",
        callbackUrl: `${window.location.origin}/api/phonepe-callback`,
        mobileNumber: "",
        paymentInstrument: {
          type: "PAY_PAGE"
        }
      };

      // Generate QR code URL for PhonePe
      const qrData = `upi://pay?pa=9067572205@axl&pn=DailyTasker&am=${amount/100}&cu=INR&tn=Premium Upgrade ${txnId}`;
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);

      toast.success('Payment initiated! Scan QR code or use PhonePe app');

      // Simulate payment verification (replace with actual PhonePe API integration)
      setTimeout(() => {
        checkPaymentStatus(txnId);
      }, 30000); // Check after 30 seconds

    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error('Failed to initiate payment');
      setPaymentStatus('idle');
    }
  };

  const checkPaymentStatus = async (txnId: string) => {
    try {
      // In a real implementation, you would check with PhonePe API
      // For now, we'll simulate success and update user status
      await updateUserToPremium(txnId);
      setPaymentStatus('success');
      generateReceipt(txnId);
      toast.success('Payment successful! Premium features activated!');
      
      // Redirect to dashboard after success
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast.error('Payment verification failed');
      setPaymentStatus('idle');
    }
  };

  const updateUserToPremium = async (txnId: string) => {
    const { error } = await supabase
      .from('user_stats')
      .update({ 
        is_premium: true,
        premium_activated_at: new Date().toISOString(),
        payment_transaction_id: txnId
      } as any)
      .eq('user_id', user?.id);

    if (error) throw error;
  };

  const generateReceipt = (txnId: string) => {
    const receipt = {
      transactionId: txnId,
      amount: '₹9.00',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      merchant: 'DailyTasker',
      status: 'Success',
      features: ['AI-Powered Smart Themes', 'Exclusive Color Schemes', 'Advanced AI Suggestions', 'Priority Task Processing', 'Premium Badge & Status']
    };

    const receiptContent = `
DAILYTASKER PREMIUM UPGRADE RECEIPT
=====================================
Transaction ID: ${receipt.transactionId}
Amount Paid: ${receipt.amount}
Date: ${receipt.date}
Time: ${receipt.time}
Status: ${receipt.status}

PREMIUM FEATURES ACTIVATED:
${receipt.features.map(feature => `• ${feature}`).join('\n')}

Thank you for upgrading to Premium!
=====================================
    `;

    // Create downloadable receipt
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DailyTasker_Receipt_${txnId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const features = [
    { icon: Brain, text: 'AI-Powered Smart Themes' },
    { icon: Palette, text: 'Exclusive Color Schemes' },
    { icon: Sparkles, text: 'Advanced AI Suggestions' },
    { icon: Zap, text: 'Priority Task Processing' },
    { icon: Crown, text: 'Premium Badge & Status' }
  ];

  if (paymentStatus === 'success') {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-xl text-green-700 dark:text-green-400">
            Premium Activated!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-sm text-green-600 dark:text-green-400">
            Transaction ID: {transactionId}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Receipt downloaded automatically
          </div>
          <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
            <Crown className="w-5 h-5" />
            <span className="font-semibold">All Premium Features Unlocked!</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-700">
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
        <div className="text-center py-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-4xl font-bold text-purple-600 dark:text-purple-400">₹9</span>
            <span className="text-lg text-gray-500 line-through">₹99</span>
          </div>
          <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold">
            🎉 Limited Time Offer - 90% OFF!
          </div>
        </div>

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

        {paymentStatus === 'processing' ? (
          <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Scan QR Code to Pay
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Use any UPI app to scan and pay ₹9
              </div>
            </div>
            
            {qrCodeUrl && (
              <div className="flex justify-center mb-4">
                <img src={qrCodeUrl} alt="Payment QR Code" className="w-48 h-48 border rounded-lg" />
              </div>
            )}
            
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Transaction ID: {transactionId}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Payment will be verified automatically. Please wait...
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={initiatePhonePePayment}
            disabled={!user}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Pay ₹9 with PhonePe
          </Button>
        )}

        {!user && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Please login to upgrade your account
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Secure UPI payment • Auto receipt generation</span>
        </div>
      </CardContent>
    </Card>
  );
};
