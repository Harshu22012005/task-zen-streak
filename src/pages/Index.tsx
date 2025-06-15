
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, Zap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-lime-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">DailyTasker</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-6">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-6">
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Plan Smart. <br />
          <span className="bg-gradient-to-r from-sky-500 to-lime-500 bg-clip-text text-transparent">
            Stay Sharp.
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your daily chaos into organized success with DailyTasker's smart task management and gamification features.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="bg-sky-500 hover:bg-sky-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              {user ? "Go to Dashboard" : "Try Now"} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          {!user && (
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg font-semibold">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Hero Image Placeholder */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200">
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <CheckCircle className="w-5 h-5 text-lime-500 mr-2" />
                Smart Tasks
              </h3>
              <div className="space-y-2">
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 text-sm">📝 Complete math assignment</div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">📋 Review presentation slides</div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">📞 Call study group</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Zap className="w-5 h-5 text-purple-500 mr-2" />
                Gamification
              </h3>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">247</div>
                <div className="text-sm opacity-90">Total Points</div>
              </div>
              <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">5 days</div>
                <div className="text-sm opacity-90">Current Streak</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Calendar className="w-5 h-5 text-lime-500 mr-2" />
                Progress Tracking
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-2">Daily Goal Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-lime-400 h-3 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <div className="text-xs text-gray-500">3 of 5 tasks completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Everything you need to stay productive
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-sky-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Task Management</h3>
              <p className="text-gray-600">Organize your tasks by priority, set due times, and never miss important deadlines again.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Gamified Experience</h3>
              <p className="text-gray-600">Earn points, build streaks, and stay motivated with our engaging reward system.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-lime-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Progress Insights</h3>
              <p className="text-gray-600">Track your productivity patterns and celebrate your achievements over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-sky-500 to-lime-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students and professionals who've made their daily tasks manageable and fun.
          </p>
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-gray-50 rounded-xl px-8 py-4 text-lg font-semibold shadow-lg">
              {user ? "Go to Dashboard" : "Get Started Today"} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DailyTasker</span>
          </div>
          <p className="text-gray-400">© 2024 DailyTasker. Plan Smart. Stay Sharp.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
