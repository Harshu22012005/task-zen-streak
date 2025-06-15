
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AnimatedBackground from "./AnimatedBackground";

interface HeroSectionProps {
  scrollY: number;
  isVisible: boolean;
}

const HeroSection = ({ scrollY, isVisible }: HeroSectionProps) => {
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 overflow-hidden">
      <AnimatedBackground scrollY={scrollY} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-bounce shadow-2xl">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              AI-Powered
            </span>
            <br />
            <span className="text-white">
              Task Management
            </span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Transform your productivity with intelligent task organization, 
            <span className="text-cyan-400 font-semibold animate-pulse"> AI insights</span>, 
            and seamless workflow automation
          </p>
        </div>
        
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 animate-pulse">
                {user ? "Enter Dashboard" : "Start Free Today"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="group border-purple-500/50 text-purple-300 hover:bg-purple-500/20 rounded-xl px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              Watch Demo
            </Button>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-2 hover:text-cyan-400 transition-colors duration-300 cursor-pointer group">
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-purple-400 transition-colors duration-300 cursor-pointer group">
              <Target className="w-5 h-5 group-hover:animate-spin" />
              <span>Goal Focused</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300 cursor-pointer group">
              <Sparkles className="w-5 h-5 group-hover:animate-bounce" />
              <span>AI Enhanced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
