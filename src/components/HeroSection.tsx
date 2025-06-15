
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, ChevronDown, Sparkles, Cpu, Network, Sparkles as SparklesIcon } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-20">
      <AnimatedBackground scrollY={scrollY} />
      
      <div className="max-w-6xl mx-auto text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-6 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm">
            <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-blue-200">Powered by AI Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Smart Tasks.</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Smarter You.
            </span>
          </h1>
        </div>
        
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of productivity with AI-powered task management. 
            Let artificial intelligence help you organize, prioritize, and achieve your goals like never before.
          </p>
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              {user ? "Open Dashboard" : "Start AI Journey"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          {!user && (
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-200 hover:bg-purple-500/10 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:border-purple-400">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <ChevronDown className="w-8 h-8 text-purple-400 mx-auto animate-bounce" />
        </div>

        {/* AI Dashboard Preview */}
        <div className={`mt-16 relative transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-lg rounded-3xl border border-purple-500/20 p-6 md:p-8 max-w-5xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-white flex items-center">
                  <Brain className="w-5 h-5 text-blue-400 mr-3 animate-pulse" />
                  AI Task Intelligence
                </h3>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-3 text-sm backdrop-blur-sm hover:from-blue-500/30 hover:to-cyan-500/30 transition-all">
                    🧠 Analyze productivity patterns
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-3 text-sm backdrop-blur-sm hover:from-purple-500/30 hover:to-pink-500/30 transition-all">
                    ⚡ Smart task prioritization
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-lg p-3 text-sm backdrop-blur-sm hover:from-cyan-500/30 hover:to-blue-500/30 transition-all">
                    🎯 Predictive scheduling
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-white flex items-center">
                  <Cpu className="w-5 h-5 text-purple-400 mr-3 animate-pulse" />
                  Neural Rewards
                </h3>
                <div className="bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/30 hover:from-purple-600/40 hover:to-pink-600/40 transition-all">
                  <div className="text-3xl font-bold text-white">347</div>
                  <div className="text-sm text-purple-200">AI Points Earned</div>
                  <div className="mt-2 flex justify-center space-x-1">
                    <SparklesIcon className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <SparklesIcon className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <SparklesIcon className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-600/30 to-blue-600/30 backdrop-blur-sm rounded-xl p-4 text-center border border-cyan-500/30 hover:from-cyan-600/40 hover:to-blue-600/40 transition-all">
                  <div className="text-3xl font-bold text-white">12 days</div>
                  <div className="text-sm text-cyan-200">Neural Streak</div>
                </div>
              </div>
              
              <div className="space-y-4 group hover:scale-105 transition-transform duration-300">
                <h3 className="font-semibold text-white flex items-center">
                  <Network className="w-5 h-5 text-cyan-400 mr-3 animate-pulse" />
                  Intelligence Insights
                </h3>
                <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-xl p-4 border border-slate-500/30 hover:from-slate-700/70 hover:to-slate-600/70 transition-all">
                  <div className="text-sm text-gray-300 mb-3">AI Performance Analysis</div>
                  <div className="w-full bg-slate-600/50 rounded-full h-3 mb-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                  </div>
                  <div className="text-xs text-gray-400">7 of 9 neural objectives completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
