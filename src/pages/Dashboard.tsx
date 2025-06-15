
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { TaskItem } from "@/components/TaskItem";
import { StatsWidget } from "@/components/StatsWidget";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { useUserStats } from "@/hooks/useUserStats";

const Dashboard = () => {
  const { tasks, addTask, toggleTask, deleteTask, isLoading, isAddingTask } = useTasks();
  const { stats } = useUserStats();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'completed'>('all');

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    addTask({ title: newTask });
    setNewTask('');
  };

  const handleToggleTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      toggleTask({ id, completed: !task.completed });
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'today':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Good morning! 🌅
              </h1>
              <p className="text-gray-600">
                You have {tasks.filter(t => !t.completed).length} tasks remaining today
              </p>
            </div>

            {/* Add Task */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex gap-3">
                <Input
                  placeholder="What needs to be done today?"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                  className="flex-1 border-gray-200 focus:border-sky-400 focus:ring-sky-400"
                />
                <Button 
                  onClick={handleAddTask}
                  disabled={isAddingTask}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 rounded-xl"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
                className={filter === 'all' ? 'bg-sky-500 hover:bg-sky-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
              >
                All ({totalCount})
              </Button>
              <Button
                variant={filter === 'today' ? 'default' : 'outline'}
                onClick={() => setFilter('today')}
                className={filter === 'today' ? 'bg-sky-500 hover:bg-sky-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
              >
                Today ({tasks.filter(t => !t.completed).length})
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                onClick={() => setFilter('completed')}
                className={filter === 'completed' ? 'bg-sky-500 hover:bg-sky-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
              >
                Completed ({completedCount})
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={deleteTask}
                />
              ))}
              
              {filteredTasks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">📝</span>
                  </div>
                  <p className="text-gray-500 text-lg">
                    {filter === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {filter === 'completed' ? 'Complete some tasks to see them here!' : 'Add a new task to get started!'}
                  </p>
                </div>
              )}
            </div>
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
  );
};

export default Dashboard;
