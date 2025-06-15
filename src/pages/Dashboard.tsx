
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import { TaskItem } from "@/components/TaskItem";
import { StatsWidget } from "@/components/StatsWidget";
import { Plus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete math assignment',
      completed: true,
      priority: 'high',
      dueTime: '2:00 PM',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Review presentation slides',
      completed: false,
      priority: 'medium',
      dueTime: '2:00 PM',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Call study group',
      completed: false,
      priority: 'low',
      createdAt: new Date(),
    },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'completed'>('all');
  const [streak, setStreak] = useState(5);
  const [points, setPoints] = useState(247);
  const { toast } = useToast();

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: 'medium',
      createdAt: new Date(),
    };
    
    setTasks([task, ...tasks]);
    setNewTask('');
    toast({
      title: "Task added!",
      description: "Your new task has been added to the list.",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          setPoints(prev => prev + 10);
          toast({
            title: "Task completed! 🎉",
            description: "+10 points earned!",
          });
        }
        return updatedTask;
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
    });
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
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  className="flex-1 border-gray-200 focus:border-sky-400 focus:ring-sky-400"
                />
                <Button 
                  onClick={addTask}
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
                  onToggle={toggleTask}
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
          <StatsWidget streak={streak} points={points} completedTasks={completedCount} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
