
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface QuickTimeButtonsProps {
  onCustomTime: (minutes: number) => void;
  onShowCustomInput: () => void;
  isFullscreen?: boolean;
}

const QuickTimeButtons = ({ onCustomTime, onShowCustomInput, isFullscreen = false }: QuickTimeButtonsProps) => {
  const buttonClass = isFullscreen 
    ? "text-white hover:bg-white/20 border border-white/30"
    : "rounded-lg";

  const containerClass = isFullscreen
    ? "text-center space-y-3 opacity-70"
    : "";

  return (
    <div className={containerClass}>
      {isFullscreen && <p className="text-lg">Quick Start:</p>}
      <div className="flex justify-center gap-3">
        <Button
          onClick={() => onCustomTime(15)}
          variant="ghost"
          size="sm"
          className={buttonClass}
        >
          15 min
        </Button>
        <Button
          onClick={() => onCustomTime(25)}
          variant="ghost"
          size="sm"
          className={buttonClass}
        >
          25 min
        </Button>
        <Button
          onClick={() => onCustomTime(45)}
          variant="ghost"
          size="sm"
          className={buttonClass}
        >
          45 min
        </Button>
        {!isFullscreen && (
          <Button
            onClick={onShowCustomInput}
            variant="outline"
            size="sm"
            className="rounded-lg"
          >
            <Clock className="w-4 h-4 mr-1" />
            Custom
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuickTimeButtons;
