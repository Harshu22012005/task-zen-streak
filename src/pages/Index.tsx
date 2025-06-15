
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Zap, Calendar, Bot, Brain, Sparkles, Cpu, Network, Code, ChevronDown, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Index = () => {
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating AI Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-pink-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Neural Network Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            <path 
              d="M 100 200 Q 300 100 500 200 T 900 200" 
              stroke="url(#neuralGradient)" 
              strokeWidth="2" 
              fill="none"
              className="animate-pulse"
            />
            <path 
              d="M 100 400 Q 300 300 500 400 T 900 400" 
              stroke="url(#neuralGradient)" 
              strokeWidth="2" 
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <path 
              d="M 100 600 Q 300 500 500 600 T 900 600" 
              stroke="url(#neuralGradient)" 
              strokeWidth="2" 
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </svg>
        </div>

        {/* Gradient Orbs */}
        <div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.3}px)`, animationDelay: '1s' }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20' : ''}`}>
        <div className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
          <div className={`flex items-center space-x-3 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DailyTasker AI
            </span>
          </div>
          
          <div className={`flex items-center space-x-4 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-4 md:px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-4 md:px-6 py-2 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  Get Started
                  <Sparkles className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 pt-20">
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
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '1s' }} />
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

      {/* AI Features Section */}
      <section className="py-20 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Productivity Revolution
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to transform how you manage tasks and achieve goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Neural Task Analysis",
                description: "AI algorithms analyze your work patterns and suggest optimal task scheduling for maximum productivity.",
                gradient: "from-blue-500 to-cyan-500",
                delay: "0s"
              },
              {
                icon: Zap,
                title: "Intelligent Automation",
                description: "Smart workflows that adapt to your habits and automatically organize your daily tasks.",
                gradient: "from-purple-500 to-pink-500",
                delay: "0.2s"
              },
              {
                icon: Sparkles,
                title: "Predictive Insights",
                description: "Machine learning models predict your productivity patterns and recommend optimal work times.",
                gradient: "from-cyan-500 to-blue-500",
                delay: "0.4s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ animationDelay: feature.delay }}
              >
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
            <Bot className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to unlock your{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                AI potential?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 opacity-90">
              Join the future of productivity. Let AI transform how you work, think, and achieve.
            </p>
            <Link to={user ? "/dashboard" : "/auth"}>
              <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
                {user ? "Enter AI Dashboard" : "Activate AI Mode"}
                <Code className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DailyTasker AI
              </span>
            </div>
            <p className="text-gray-400 mb-4">© 2024 DailyTasker AI. Powered by Intelligence. Driven by Results.</p>
          </div>
          
          {/* Developer Credits */}
          <div className="text-center border-t border-purple-500/20 pt-6">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span>Created by</span>
              <a 
                href="https://www.linkedin.com/in/harshad-pakhale-221hp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
              >
                <span className="font-semibold">Harshad Harishchandra Pakhale</span>
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
