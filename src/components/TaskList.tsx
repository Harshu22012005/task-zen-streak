
import { TaskItem } from "@/components/TaskItem";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
  createdAt: Date;
  user_id: string;
}

interface TaskListProps {
  tasks: Task[];
  filter: 'all' | 'today' | 'completed';
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskList = ({ tasks, filter, onToggleTask, onDeleteTask }: TaskListProps) => {
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

  if (filteredTasks.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};
