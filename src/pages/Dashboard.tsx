
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { NavigationHeader } from "@/components/NavigationHeader";
import { StatsWidget } from "@/components/StatsWidget";
import { DashboardHeader } from "@/components/DashboardHeader";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskList } from "@/components/TaskList";
import { WeekSchedule } from "@/components/WeekSchedule";
import { MotivationalQuotes } from "@/components/MotivationalQuotes";
import { useTasks } from "@/hooks/useTasks";
import { useUserStats } from "@/hooks/useUserStats";

const Dashboard = () => {
  const { tasks, addTask, toggleTask, deleteTask, isLoading, isAddingTask } = useTasks();
  const { stats } = useUserStats();
  const [filter, setFilter] = useState<'all' | 'today' | 'completed'>('all');

  const handleAddTask = (title: string) => {
    addTask({ title });
  };

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      toggleTask({ id, completed: !task.completed });
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const incompleteCount = tasks.filter(t => !t.completed).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-sky-500 rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Mobile Navigation Header */}
      <NavigationHeader />
      
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <Sidebar />
        
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Main Content */}
          <main className="flex-1 p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <DashboardHeader incompleteTasks={incompleteCount} />
              
              {/* Mobile Motivational Quotes - Show only on mobile */}
              <div className="lg:hidden mb-6">
                <MotivationalQuotes />
              </div>
              
              {/* Week Schedule Section */}
              <div className="mb-8">
                <WeekSchedule tasks={tasks} />
              </div>
              
              <AddTaskForm 
                onAddTask={handleAddTask}
                isAddingTask={isAddingTask}
              />

              <TaskFilters
                filter={filter}
                onFilterChange={setFilter}
                totalCount={totalCount}
                incompleteCount={incompleteCount}
                completedCount={completedCount}
              />

              <TaskList
                tasks={tasks}
                filter={filter}
                onToggleTask={handleToggleTask}
                onDeleteTask={deleteTask}
              />
            </div>
          </main>

          {/* Right Sidebar - Stats */}
          <aside className="w-full lg:w-80 p-4 lg:p-8">
            <StatsWidget 
              streak={stats.current_streak} 
              points={stats.points} 
              completedTasks={completedCount} 
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
