
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock, X } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueTime?: string;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50',
  };

  const priorityDots = {
    high: 'bg-red-400',
    medium: 'bg-yellow-400', 
    low: 'bg-green-400',
  };

  return (
    <div 
      className={`bg-white rounded-xl border-2 transition-all duration-200 hover:shadow-md group ${
        task.completed ? 'border-lime-200 bg-lime-50' : priorityColors[task.priority]
      }`}
    >
      <div className="p-4 flex items-center gap-4">
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 transition-transform hover:scale-110"
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-lime-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-400 hover:text-sky-500" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-base transition-all ${
                task.completed 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-800'
              }`}
            >
              {task.title}
            </span>
            {!task.completed && (
              <div className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`} />
            )}
          </div>
          
          {task.dueTime && !task.completed && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>Due {task.dueTime}</span>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-2"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
