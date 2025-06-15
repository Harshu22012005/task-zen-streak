
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Sparkles, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface NavigationBarProps {
  scrollY: number;
  isVisible: boolean;
}

const NavigationBar = ({ scrollY, isVisible }: NavigationBarProps) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20' : ''}`}>
      <div className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
        <div className={`flex items-center space-x-3 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse hover:scale-110 transition-transform duration-300">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
            DailyTasker AI
          </span>
        </div>
        
        <div className={`flex items-center space-x-4 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-4 md:px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20 rounded-xl px-4 py-2 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-4 md:px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Get Started
                <Sparkles className="ml-2 w-4 h-4 animate-pulse" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
