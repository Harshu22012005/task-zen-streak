
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import QuickTimeButtons from "./QuickTimeButtons";

interface FullscreenTimerProps {
  timeLeft: number;
  sessionType: 'work' | 'break';
  isRunning: boolean;
  onStart: () => void;
  onReset: () => void;
  onCustomTime: (minutes: number) => void;
  onExit: () => void;
}

const FullscreenTimer = ({
  timeLeft,
  sessionType,
  isRunning,
  onStart,
  onReset,
  onCustomTime,
  onExit
}: FullscreenTimerProps) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center text-white z-50">
      <Button
        onClick={onExit}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
        <TimerDisplay 
          timeLeft={timeLeft} 
          sessionType={sessionType} 
          isFullscreen={true} 
        />

        <TimerControls
          isRunning={isRunning}
          onStart={onStart}
          onReset={onReset}
          isFullscreen={true}
        />

        <QuickTimeButtons
          onCustomTime={onCustomTime}
          onShowCustomInput={() => {}}
          isFullscreen={true}
        />

        <div className="mt-8">
          <MusicPlayer isFullscreen={true} />
        </div>
      </div>
    </div>
  );
};

export default FullscreenTimer;
