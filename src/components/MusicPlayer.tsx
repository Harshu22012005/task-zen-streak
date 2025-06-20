
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Upload, SkipForward, SkipBack, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioFiles } from "@/hooks/useAudioFiles";
import { useAuth } from "@/hooks/useAuth";

interface MusicPlayerProps {
  isFullscreen?: boolean;
}

const MusicPlayer = ({ isFullscreen = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { audioFiles, loading, uploadAudioFile, deleteAudioFile } = useAudioFiles();
  const { user } = useAuth();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrackIndex < audioFiles.length - 1) {
        setCurrentTrackIndex(currentTrackIndex + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex, audioFiles.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioFiles.length > 0 && audioFiles[currentTrackIndex]) {
      audio.src = audioFiles[currentTrackIndex].url;
      audio.volume = isMuted ? 0 : volume;
    }
  }, [currentTrackIndex, audioFiles, volume, isMuted]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    const audioFile = files[0];
    if (audioFile && audioFile.type.startsWith('audio/')) {
      await uploadAudioFile(audioFile);
    }
    
    // Reset input
    event.target.value = '';
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || audioFiles.length === 0) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < audioFiles.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTrack = audioFiles[currentTrackIndex];

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Please login to access the music player
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const playerContent = (
    <div className={`space-y-4 ${isFullscreen ? 'text-white' : ''}`}>
      <audio ref={audioRef} />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload Button */}
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant={isFullscreen ? "outline" : "default"}
        className={`w-full ${isFullscreen ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm' : ''}`}
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Audio Files
      </Button>

      {loading && (
        <div className={`text-center ${isFullscreen ? 'text-white' : 'text-gray-600'}`}>
          Loading your music library...
        </div>
      )}

      {/* Current Track Info */}
      {currentTrack && (
        <div className={`text-center space-y-2 ${isFullscreen ? 'text-white' : 'text-gray-800'}`}>
          <div className="text-sm opacity-80">Now Playing</div>
          <div className="font-medium">{currentTrack.name}</div>
          <div className="text-xs opacity-60">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      )}

      {/* Player Controls */}
      <div className="flex items-center justify-center space-x-4">
        <Button
          onClick={prevTrack}
          disabled={currentTrackIndex === 0}
          variant={isFullscreen ? "outline" : "default"}
          size="sm"
          className={isFullscreen ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm' : ''}
        >
          <SkipBack className="w-4 h-4" />
        </Button>

        <Button
          onClick={togglePlay}
          disabled={audioFiles.length === 0}
          variant={isFullscreen ? "outline" : "default"}
          className={isFullscreen ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm' : ''}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>

        <Button
          onClick={nextTrack}
          disabled={currentTrackIndex >= audioFiles.length - 1}
          variant={isFullscreen ? "outline" : "default"}
          size="sm"
          className={isFullscreen ? 'bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm' : ''}
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center space-x-3">
        <Button
          onClick={toggleMute}
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
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Playlist */}
      {audioFiles.length > 0 && (
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
                <span className="truncate flex-1 cursor-pointer" onClick={() => setCurrentTrackIndex(index)}>
                  {file.name}
                </span>
                <Button
                  onClick={() => deleteAudioFile(file.id)}
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
      )}
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="space-y-4">
        <Button
          onClick={() => setIsPlayerOpen(!isPlayerOpen)}
          variant="outline"
          className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-8 py-4 text-lg backdrop-blur-sm"
        >
          <Volume2 className="w-6 h-6 mr-3" />
          {isPlayerOpen ? 'Hide Music Player' : 'Show Music Player'}
        </Button>

        {isPlayerOpen && (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              {playerContent}
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Music Player</h3>
        {playerContent}
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
