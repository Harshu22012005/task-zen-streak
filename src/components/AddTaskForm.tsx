
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAddTask: (title: string) => void;
  isAddingTask: boolean;
}

export const AddTaskForm = ({ onAddTask, isAddingTask }: AddTaskFormProps) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    onAddTask(newTask);
    setNewTask('');
  };

  return (
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
  );
};
