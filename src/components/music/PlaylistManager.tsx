
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AudioFile } from "@/hooks/useAudioFiles";

interface PlaylistManagerProps {
  audioFiles: AudioFile[];
  currentTrackIndex: number;
  isFullscreen?: boolean;
  onTrackSelect: (index: number) => void;
  onDeleteTrack: (id: string) => void;
}

const PlaylistManager = ({
  audioFiles,
  currentTrackIndex,
  isFullscreen = false,
  onTrackSelect,
  onDeleteTrack
}: PlaylistManagerProps) => {
  if (audioFiles.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className={`text-sm font-medium ${isFullscreen ? 'text-white' : 'text-gray-700'}`}>
        Your Music Library ({audioFiles.length} tracks)
      </div>
      <div className="max-h-40 overflow-y-auto space-y-1">
        {audioFiles.map((file, index) => (
          <div
            key={file.id}
            className={`flex items-center justify-between p-2 rounded text-sm ${
              index === currentTrackIndex
                ? isFullscreen 
                  ? 'bg-white/20 text-white' 
                  : 'bg-sky-50 text-sky-700'
                : isFullscreen
                  ? 'bg-white/10 text-white/80 hover:bg-white/20'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span 
              className="truncate flex-1 cursor-pointer" 
              onClick={() => onTrackSelect(index)}
            >
              {file.name}
            </span>
            <Button
              onClick={() => onDeleteTrack(file.id)}
              variant="ghost"
              size="sm"
              className={`h-6 w-6 p-0 ${isFullscreen ? 'text-white/60 hover:text-white hover:bg-white/20' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistManager;
