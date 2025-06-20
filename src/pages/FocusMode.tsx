
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, X } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const enterFullscreen = () => {
    setIsFullscreen(true);
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    setIsFullscreen(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center text-white z-50">
        <Button
          onClick={exitFullscreen}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            <div className="text-lg font-medium opacity-80">
              {sessionType === 'work' ? 'Focus Session' : 'Break Time'}
            </div>
            <div className="text-8xl md:text-9xl font-bold tracking-wider">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              onClick={handleStart}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-4 text-lg backdrop-blur-sm"
              variant="outline"
            >
              {isRunning ? <Pause className="w-6 h-6 mr-3" /> : <Play className="w-6 h-6 mr-3" />}
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-4 text-lg backdrop-blur-sm"
            >
              <RotateCcw className="w-6 h-6 mr-3" />
              Reset
            </Button>
          </div>

          <div className="text-center space-y-3 opacity-70">
            <p className="text-lg">Quick Start:</p>
            <div className="flex justify-center gap-3">
              <Button
                onClick={() => handleCustomTime(15)}
                variant="ghost"
                className="text-white hover:bg-white/20 border border-white/30"
              >
                15 min
              </Button>
              <Button
                onClick={() => handleCustomTime(25)}
                variant="ghost"
                className="text-white hover:bg-white/20 border border-white/30"
              >
                25 min
              </Button>
              <Button
                onClick={() => handleCustomTime(45)}
                variant="ghost"
                className="text-white hover:bg-white/20 border border-white/30"
              >
                45 min
              </Button>
            </div>
          </div>

          {/* Music Player in Fullscreen */}
          <div className="mt-8">
            <MusicPlayer isFullscreen={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Focus Mode 🎯
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Use the Pomodoro technique to boost your productivity
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
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

              <Button
                onClick={enterFullscreen}
                variant="outline"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
              >
                Enter Focus Mode
              </Button>
            </div>
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Start</h3>
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

        {/* Music Player in Regular Mode */}
        <div className="mt-6">
          <MusicPlayer />
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">How it works</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Work for 25 minutes with full focus</p>
            <p>• Take a 5-minute break</p>
            <p>• Repeat the cycle to maximize productivity</p>
            <p>• After 4 cycles, take a longer 15-30 minute break</p>
            <p>• Use fullscreen mode for distraction-free focus</p>
            <p>• Upload your favorite focus music to stay motivated</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
