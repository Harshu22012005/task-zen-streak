
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  isFullscreen?: boolean;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({
  volume,
  isMuted,
  isFullscreen = false,
  onToggleMute,
  onVolumeChange
}: VolumeControlProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={onToggleMute}
        variant="ghost"
        size="sm"
        className={isFullscreen ? 'text-white hover:bg-white/20' : ''}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </Button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default VolumeControl;
