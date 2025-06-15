import { NavigationHeader } from "@/components/NavigationHeader";
import { Sidebar } from "@/components/Sidebar";
import { useUserStats } from "@/hooks/useUserStats";
import { Calendar, Trophy, Target, Flame } from "lucide-react";

const Streaks = () => {
  const { stats, isLoading } = useUserStats();

  const streakData = [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: false },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: true },
    { day: 'Sat', completed: false },
    { day: 'Sun', completed: true },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-sky-500 rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your streaks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <NavigationHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Streaks & Progress 🔥
              </h1>
              <p className="text-gray-600">
                Track your consistency and build lasting habits
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{stats.current_streak}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Current Streak</h3>
                <p className="text-sm text-gray-600">Days in a row</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{stats.longest_streak}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Best Streak</h3>
                <p className="text-sm text-gray-600">Personal record</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-sky-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{stats.points}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Total Points</h3>
                <p className="text-sm text-gray-600">Lifetime earned</p>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-sky-600" />
                <h2 className="text-xl font-semibold text-gray-800">This Week</h2>
              </div>
              
              <div className="grid grid-cols-7 gap-4">
                {streakData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto ${
                      day.completed 
                        ? 'bg-green-100 border-2 border-green-200' 
                        : 'bg-gray-100 border-2 border-gray-200'
                    }`}>
                      {day.completed ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                      ) : (
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Achievements</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">First Streak</h3>
                    <p className="text-sm text-gray-600">Complete 3 days in a row</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Point Collector</h3>
                    <p className="text-sm text-gray-600">Earn 100 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Streaks;
