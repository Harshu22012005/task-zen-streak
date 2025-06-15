
import { Button } from "@/components/ui/button";
import { Home, Target, Zap, Settings, Calendar, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: Target, label: 'Tasks', path: '/dashboard' },
    { icon: Zap, label: 'Focus Mode', path: '/focus' },
    { icon: Calendar, label: 'Streaks', path: '/streaks' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 hidden lg:block">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">DailyTasker</span>
        </div>
      </div>

      <nav className="space-y-2 mb-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-sky-50 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-700' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start text-left px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </Button>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl border border-purple-100 dark:border-purple-800">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Upgrade to Pro</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Unlock advanced features and themes
            </p>
            <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};
