
import { Card } from "@/components/ui/card";
import { Zap, Target, Calendar, TrendingUp } from "lucide-react";

interface StatsWidgetProps {
  streak: number;
  points: number;
  completedTasks: number;
}

export const StatsWidget = ({ streak, points, completedTasks }: StatsWidgetProps) => {
  const motivationalQuotes = [
    "Progress, not perfection! 🌟",
    "Small steps lead to big wins! 🚀",
    "You're doing amazing! Keep going! 💪",
    "Consistency is the key to success! 🔑",
    "Every task completed is a victory! 🎯",
  ];

  const todayQuote = motivationalQuotes[Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % motivationalQuotes.length];

  return (
    <div className="space-y-4">
      {/* Streak Widget */}
      <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-purple-100 text-sm font-medium">Current Streak</p>
            <p className="text-3xl font-bold">{streak} days</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center text-sm text-purple-100">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>Keep it up!</span>
        </div>
      </Card>

      {/* Points Widget */}
      <Card className="p-6 bg-gradient-to-br from-sky-500 to-blue-500 text-white border-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sky-100 text-sm font-medium">Total Points</p>
            <p className="text-3xl font-bold">{points}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
        </div>
        <div className="text-sm text-sky-100">
          <span>+{completedTasks * 10} points today</span>
        </div>
      </Card>

      {/* Today's Progress */}
      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Today's Progress</h3>
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tasks Completed</span>
            <span className="font-medium text-gray-800">{completedTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-lime-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((completedTasks / 5) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {completedTasks >= 5 ? 'Goal achieved! 🎉' : `${5 - completedTasks} more to reach daily goal`}
          </p>
        </div>
      </Card>

      {/* Motivational Quote */}
      <Card className="p-6 bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200">
        <div className="text-center">
          <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💡</span>
          </div>
          <p className="text-gray-700 font-medium text-sm leading-relaxed">
            {todayQuote}
          </p>
        </div>
      </Card>

      {/* Mini Calendar */}
      <Card className="p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-4">This Week</h3>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={day} className="text-center text-gray-500 mb-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 7 }, (_, index) => {
            const isToday = index === 2; // Wednesday as today
            const hasActivity = index <= 2; // Mon, Tue, Wed have activity
            return (
              <div
                key={index}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  isToday
                    ? 'bg-sky-500 text-white'
                    : hasActivity
                    ? 'bg-lime-100 text-lime-700'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {18 + index}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
