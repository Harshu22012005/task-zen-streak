import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Pause, RotateCcw } from "lucide-react";
import { NavigationHeader } from "@/components/NavigationHeader";

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Switch between work and break sessions
      if (sessionType === 'work') {
        setSessionType('break');
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setSessionType('work');
        setTimeLeft(25 * 60); // 25 minute work session
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, sessionType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'work' ? 25 * 60 : 5 * 60);
  };

  const handleCustomTime = (minutes: number) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <NavigationHeader />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Focus Mode 🎯
              </h1>
              <p className="text-gray-600">
                Use the Pomodoro technique to boost your productivity
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {sessionType === 'work' ? 'Work Session' : 'Break Time'}
                </div>
                <div className="text-6xl font-bold text-sky-600 mb-4">
                  {formatTime(timeLeft)}
                </div>
                
                <div className="flex justify-center gap-4 mb-6">
                  <Button
                    onClick={handleStart}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl"
                  >
                    {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </Button>
                  
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="px-8 py-3 rounded-xl"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Start</h3>
                <div className="flex justify-center gap-3">
                  <Button
                    onClick={() => handleCustomTime(15)}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    15 min
                  </Button>
                  <Button
                    onClick={() => handleCustomTime(25)}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    25 min
                  </Button>
                  <Button
                    onClick={() => handleCustomTime(45)}
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    45 min
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How it works</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Work for 25 minutes with full focus</p>
                <p>• Take a 5-minute break</p>
                <p>• Repeat the cycle to maximize productivity</p>
                <p>• After 4 cycles, take a longer 15-30 minute break</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FocusMode;
