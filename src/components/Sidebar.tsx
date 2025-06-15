
import { Button } from "@/components/ui/button";
import { Home, Target, Zap, Settings, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Overview', path: '/dashboard' },
    { icon: Target, label: 'Tasks', path: '/dashboard' },
    { icon: Zap, label: 'Focus Mode', path: '/focus' },
    { icon: Calendar, label: 'Streaks', path: '/streaks' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden lg:block">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800">DailyTasker</span>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-sky-50 text-sky-600 border border-sky-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mt-12 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
        <div className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">Upgrade to Pro</h3>
          <p className="text-sm text-gray-600 mb-3">
            Unlock advanced features and themes
          </p>
          <Button size="sm" className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
            Upgrade Now
          </Button>
        </div>
      </div>
    </aside>
  );
};
