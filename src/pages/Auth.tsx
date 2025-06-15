
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Target, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { user, signUp, signIn } = useAuth();
  const { toast } = useToast();

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isSignUp 
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else if (isSignUp) {
        toast({
          title: "Success!",
          description: "Check your email to confirm your account.",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) {
        toast({
          title: "Google Sign-In Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred with Google sign-in.",
        variant: "destructive",
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-lime-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-200/30 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lime-200/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-purple-200/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-pink-200/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="flex gap-8 max-w-6xl w-full relative z-10">
        {/* Left side - Time and Calendar Widget */}
        <div className="hidden lg:flex flex-col space-y-6 flex-1">
          {/* Real-time Clock */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="w-6 h-6 text-sky-500 animate-pulse" />
                <h3 className="text-xl font-semibold text-gray-800">Current Time</h3>
              </div>
              <div className="text-4xl font-bold text-sky-600 mb-2 animate-scale-in">
                {format(currentTime, 'HH:mm:ss')}
              </div>
              <div className="text-lg text-gray-600">
                {format(currentTime, 'EEEE, MMMM do, yyyy')}
              </div>
            </div>
          </Card>

          {/* Calendar Widget */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center mb-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CalendarIcon className="w-6 h-6 text-lime-500" />
                <h3 className="text-xl font-semibold text-gray-800">Calendar</h3>
              </div>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border-0 shadow-sm bg-white/50"
            />
            {selectedDate && (
              <div className="mt-4 text-center text-sm text-gray-600 animate-fade-in">
                Selected: {format(selectedDate, 'PPP')}
              </div>
            )}
          </Card>

          {/* Productivity Quote */}
          <Card className="p-6 bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0 shadow-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <blockquote className="text-lg italic mb-2">
                "The key is not to prioritize what's on your schedule, but to schedule your priorities."
              </blockquote>
              <cite className="text-sm opacity-90">- Stephen Covey</cite>
            </div>
          </Card>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex-1 max-w-md mx-auto lg:mx-0">
          <Card className="w-full p-8 shadow-2xl bg-white/90 backdrop-blur-sm border-0 animate-scale-in">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4 animate-fade-in">
                <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center animate-pulse">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-800">DailyTasker</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800 mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {isSignUp ? 'Start organizing your tasks today' : 'Sign in to continue'}
              </p>
            </div>

            {/* Google Sign-In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              variant="outline"
              className="w-full mb-4 border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </Button>

            <div className="relative mb-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full transition-all duration-300 focus:scale-105"
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full transition-all duration-300 focus:scale-105"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-sky-500 hover:bg-sky-600 transition-all duration-300 hover:scale-105 animate-fade-in"
                disabled={loading}
                style={{ animationDelay: '0.7s' }}
              >
                {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </Button>
            </form>

            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sky-600 hover:text-sky-700 text-sm transition-colors duration-300 hover:underline"
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
