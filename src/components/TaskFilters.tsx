
import { Button } from "@/components/ui/button";

interface TaskFiltersProps {
  filter: 'all' | 'today' | 'completed';
  onFilterChange: (filter: 'all' | 'today' | 'completed') => void;
  totalCount: number;
  incompleteCount: number;
  completedCount: number;
}

export const TaskFilters = ({ 
  filter, 
  onFilterChange, 
  totalCount, 
  incompleteCount, 
  completedCount 
}: TaskFiltersProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={filter === 'all' ? 'default' : 'outline'}
        onClick={() => onFilterChange('all')}
        className={filter === 'all' ? 'bg-sky-500 hover:bg-sky-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
      >
        All ({totalCount})
      </Button>
      <Button
        variant={filter === 'today' ? 'default' : 'outline'}
        onClick={() => onFilterChange('today')}
        className={filter === 'today' ? 'bg-sky-500 hover:bg-sky-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
      >
        Today ({incompleteCount})
      </Button>
      <Button
        variant={filter === 'completed' ? 'default' : 'outline'}
        onClick={() => onFilterChange('completed')}
        className={filter === 'completed' ? 'bg-sky-500 hover:bg-sky-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
      >
        Completed ({completedCount})
      </Button>
    </div>
  );
};
