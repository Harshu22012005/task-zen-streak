
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">DailyTasker</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-gray-600 hover:text-sky-600">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Plan Smart.
                <span className="text-sky-500 block">Stay Sharp.</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Transform your daily chaos into organized success. DailyTasker helps students and professionals stay productive with smart task management and motivating gamification.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  Try Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-sky-200 text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-xl"
              >
                Learn More
              </Button>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-lime-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Smart Tasks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Streak System</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Focus Mode</p>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:order-2 animate-fade-in">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-800">Today's Tasks</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-500">5 streak</span>
                    </div>
                  </div>
                  
                  {/* Mock Tasks */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-lime-50 rounded-xl border border-lime-200">
                      <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 line-through">Complete math assignment</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-sky-50 rounded-xl border border-sky-200">
                      <div className="w-5 h-5 border-2 border-sky-400 rounded-full"></div>
                      <span className="text-gray-700">Review presentation slides</span>
                      <span className="ml-auto text-xs text-sky-600 bg-sky-100 px-2 py-1 rounded-full">Due 2pm</span>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                      <span className="text-gray-700">Call study group</span>
                    </div>
                  </div>

                  {/* Points widget */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Weekly Points</p>
                        <p className="text-2xl font-bold text-purple-600">247</p>
                      </div>
                      <Zap className="w-8 h-8 text-purple-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-200 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-lime-200 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-sky-200">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2024 DailyTasker. Built for productivity enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
