
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fallbackQuotes = [
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who prepare for it today.", author: "Malcolm X" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" }
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        
        // Try to fetch from API
        const response = await fetch('https://api.quotable.io/random?minLength=50&maxLength=150&tags=motivational|inspirational|success');
        
        if (response.ok) {
          const data = await response.json();
          setQuote(data.content);
          setAuthor(data.author);
        } else {
          throw new Error('API failed');
        }
      } catch (error) {
        console.log('Using fallback quote due to API error:', error);
        // Use fallback quote
        const randomQuote = getRandomQuote();
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
    
    // Refresh quote every 30 seconds
    const interval = setInterval(fetchQuote, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <Quote className="w-6 h-6 text-purple-500 animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3">
          <Quote className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed mb-3">
              {quote}
            </p>
            <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
              — {author}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuotes;
