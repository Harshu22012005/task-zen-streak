
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';

interface WeekScheduleProps {
  tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    dueTime?: string;
    createdAt: Date;
  }>;
}

export const WeekSchedule = ({ tasks }: WeekScheduleProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Start on Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getTasksForDay = (date: Date) => {
    return tasks.filter(task => isSameDay(task.createdAt, date));
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">This Week</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="font-mono">
                {format(currentTime, 'HH:mm:ss')} - {format(currentTime, 'EEEE, MMM dd')}
              </span>
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextWeek}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Week Range */}
      <div className="text-center mb-4">
        <span className="text-sm font-medium text-gray-700">
          {format(weekStart, 'MMM dd')} - {format(addDays(weekStart, 6), 'MMM dd, yyyy')}
        </span>
      </div>

      {/* Week Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDay(day);
          const isToday = isSameDay(day, currentTime);
          const completedTasks = dayTasks.filter(task => task.completed).length;
          
          return (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                isToday
                  ? 'bg-blue-500 text-white border-blue-600 shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {/* Day Header */}
              <div className="text-center mb-2">
                <div className={`text-xs font-medium ${isToday ? 'text-blue-100' : 'text-gray-500'}`}>
                  {format(day, 'EEE')}
                </div>
                <div className={`text-lg font-bold ${isToday ? 'text-white' : 'text-gray-800'}`}>
                  {format(day, 'd')}
                </div>
              </div>

              {/* Tasks Summary */}
              <div className="space-y-1">
                {dayTasks.length > 0 ? (
                  <>
                    <div className={`text-xs ${isToday ? 'text-blue-100' : 'text-gray-600'}`}>
                      {completedTasks}/{dayTasks.length} completed
                    </div>
                    <div className={`w-full h-2 rounded-full ${isToday ? 'bg-blue-400' : 'bg-gray-200'}`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          isToday ? 'bg-white' : 'bg-blue-500'
                        }`}
                        style={{ width: `${dayTasks.length > 0 ? (completedTasks / dayTasks.length) * 100 : 0}%` }}
                      />
                    </div>
                    
                    {/* Task Preview */}
                    <div className="mt-2 space-y-1">
                      {dayTasks.slice(0, 2).map(task => (
                        <div
                          key={task.id}
                          className={`text-xs p-1 rounded truncate ${
                            isToday
                              ? task.completed 
                                ? 'bg-blue-400 text-blue-100' 
                                : 'bg-blue-600 text-white'
                              : task.completed 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className={`text-xs ${isToday ? 'text-blue-200' : 'text-gray-500'}`}>
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={`text-xs text-center py-2 ${isToday ? 'text-blue-200' : 'text-gray-400'}`}>
                    No tasks
                  </div>
                )}
              </div>

              {/* Time indicator for today */}
              {isToday && (
                <div className="mt-2 text-center">
                  <div className="text-xs font-mono text-blue-100">
                    {format(currentTime, 'HH:mm')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Weekly Summary */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{tasks.length}</div>
            <div className="text-xs text-gray-600">Total Tasks</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {tasks.filter(task => task.completed).length}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">
              {tasks.filter(task => !task.completed).length}
            </div>
            <div className="text-xs text-gray-600">Pending</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {Math.round(tasks.length > 0 ? (tasks.filter(task => task.completed).length / tasks.length) * 100 : 0)}%
            </div>
            <div className="text-xs text-gray-600">Progress</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
