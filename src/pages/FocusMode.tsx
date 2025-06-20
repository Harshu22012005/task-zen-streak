
import { useState, useEffect } from "react";
import MusicPlayer from "@/components/MusicPlayer";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import TimerDisplay from "@/components/focus/TimerDisplay";
import TimerControls from "@/components/focus/TimerControls";
import QuickTimeButtons from "@/components/focus/QuickTimeButtons";
import CustomTimeInput from "@/components/focus/CustomTimeInput";
import FocusInstructions from "@/components/focus/FocusInstructions";
import FullscreenTimer from "@/components/focus/FullscreenTimer";

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      speakNotification();
      
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

  const speakNotification = () => {
    const message = sessionType === 'work' 
      ? "Hi Sir, Your Focus Session is over. Ready for the Work. Have a good day!"
      : "Hi Sir, Your break time is over. Ready to focus again!";
    
    speak(message, {
      rate: 0.8,
      pitch: 1,
      volume: 0.8
    });
  };

  const handleStart = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(sessionType === 'work' ? customMinutes * 60 : 5 * 60);
  };

  const handleCustomTime = (minutes: number) => {
    setIsRunning(false);
    setCustomMinutes(minutes);
    setTimeLeft(minutes * 60);
  };

  const handleCustomTimeSubmit = () => {
    if (customMinutes > 0 && customMinutes <= 180) { // Max 3 hours
      setIsRunning(false);
      setTimeLeft(customMinutes * 60);
      setShowCustomInput(false);
    }
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
      <FullscreenTimer
        timeLeft={timeLeft}
        sessionType={sessionType}
        isRunning={isRunning}
        onStart={handleStart}
        onReset={handleReset}
        onCustomTime={handleCustomTime}
        onExit={exitFullscreen}
      />
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
          <TimerDisplay timeLeft={timeLeft} sessionType={sessionType} />
          
          <TimerControls
            isRunning={isRunning}
            onStart={handleStart}
            onReset={handleReset}
            onEnterFullscreen={enterFullscreen}
          />

          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Start</h3>
            
            <QuickTimeButtons
              onCustomTime={handleCustomTime}
              onShowCustomInput={() => setShowCustomInput(!showCustomInput)}
            />

            {showCustomInput && (
              <CustomTimeInput
                customMinutes={customMinutes}
                onChange={setCustomMinutes}
                onSubmit={handleCustomTimeSubmit}
              />
            )}
          </div>
        </div>

        <div className="mt-6">
          <MusicPlayer />
        </div>

        <FocusInstructions />
      </div>
    </div>
  );
};

export default FocusMode;
