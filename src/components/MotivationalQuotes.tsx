
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Quote, Heart } from 'lucide-react';
import { toast } from 'sonner';

interface QuoteData {
  text: string;
  author: string;
}

export const MotivationalQuotes = () => {
  const [quote, setQuote] = useState<QuoteData>({ text: '', author: '' });
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      // Using a different quotes API that's more reliable
      const response = await fetch('https://api.quotable.io/quotes/random?minLength=50&maxLength=150&tags=motivational|success|inspirational', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Quote API response:', data);
      
      if (data && data.length > 0) {
        setQuote({
          text: data[0].content,
          author: data[0].author
        });
      } else {
        throw new Error('No quotes returned from API');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Enhanced fallback quotes
      const fallbackQuotes = [
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
        { text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.", author: "Unknown" },
        { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
        { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
      ];
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote);
      toast.error('Using offline quote - API temporarily unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700 animate-fade-in hover:scale-105 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center animate-pulse">
            <Quote className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-gray-800 dark:text-gray-200">Daily Motivation</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-normal">
              Inspire your day
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {quote.text ? (
          <div className="space-y-3 animate-fade-in">
            <blockquote className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">
              "{quote.text}"
            </blockquote>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-right">
              — {quote.author}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 ml-auto"></div>
          </div>
        )}

        <Button
          onClick={fetchQuote}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-105"
        >
          {isLoading ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Heart className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Loading...' : 'New Quote'}
        </Button>

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Powered by Quotable API</span>
        </div>
      </CardContent>
    </Card>
  );
};
