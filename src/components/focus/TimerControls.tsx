
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onReset: () => void;
  onEnterFullscreen?: () => void;
  isFullscreen?: boolean;
}

const TimerControls = ({ 
  isRunning, 
  onStart, 
  onReset, 
  onEnterFullscreen,
  isFullscreen = false 
}: TimerControlsProps) => {
  if (isFullscreen) {
    return (
      <div className="flex justify-center gap-6">
        <Button
          onClick={onStart}
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-4 text-lg backdrop-blur-sm"
          variant="outline"
        >
          {isRunning ? <Pause className="w-6 h-6 mr-3" /> : <Play className="w-6 h-6 mr-3" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          onClick={onReset}
          variant="outline"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-4 text-lg backdrop-blur-sm"
        >
          <RotateCcw className="w-6 h-6 mr-3" />
          Reset
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-4 mb-6">
      <Button
        onClick={onStart}
        className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl"
      >
        {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      
      <Button
        onClick={onReset}
        variant="outline"
        className="px-8 py-3 rounded-xl"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset
      </Button>

      {onEnterFullscreen && (
        <Button
          onClick={onEnterFullscreen}
          variant="outline"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none hover:from-purple-600 hover:to-pink-600"
        >
          Enter Focus Mode
        </Button>
      )}
    </div>
  );
};

export default TimerControls;
