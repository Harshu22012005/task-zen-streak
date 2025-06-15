
import { Target } from "lucide-react";
import { MobileNav } from "./MobileNav";

export const NavigationHeader = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between md:hidden">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-800 dark:text-gray-200">DailyTasker</span>
      </div>
      <MobileNav />
    </header>
  );
};
