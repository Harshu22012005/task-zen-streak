
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  canPlayPrev: boolean;
  canPlayNext: boolean;
  hasAudioFiles: boolean;
  isFullscreen?: boolean;
  onTogglePlay: () => void;
  onPrevTrack: () => void;
  onNextTrack: () => void;
}

const PlayerControls = ({
  isPlaying,
  canPlayPrev,
  canPlayNext,
  hasAudioFiles,
  isFullscreen = false,
  onTogglePlay,
  onPrevTrack,
  onNextTrack
}: PlayerControlsProps) => {
  const buttonClass = isFullscreen 
    ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm' 
    : '';

  return (
    <div className="flex items-center justify-center space-x-4">
      <Button
        onClick={onPrevTrack}
        disabled={!canPlayPrev}
        variant={isFullscreen ? "outline" : "default"}
        size="sm"
        className={buttonClass}
      >
        <SkipBack className="w-4 h-4" />
      </Button>

      <Button
        onClick={onTogglePlay}
        disabled={!hasAudioFiles}
        variant={isFullscreen ? "outline" : "default"}
        className={buttonClass}
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </Button>

      <Button
        onClick={onNextTrack}
        disabled={!canPlayNext}
        variant={isFullscreen ? "outline" : "default"}
        size="sm"
        className={buttonClass}
      >
        <SkipForward className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default PlayerControls;
