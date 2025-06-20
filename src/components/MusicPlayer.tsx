
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioFiles } from "@/hooks/useAudioFiles";
import { useAuth } from "@/hooks/useAuth";
import PlayerControls from "./music/PlayerControls";
import VolumeControl from "./music/VolumeControl";
import PlaylistManager from "./music/PlaylistManager";
import FileUploader from "./music/FileUploader";
import TrackInfo from "./music/TrackInfo";

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

  const handleFileUpload = async (files: FileList) => {
    if (!user) return;

    const audioFile = files[0];
    if (audioFile && audioFile.type.startsWith('audio/')) {
      await uploadAudioFile(audioFile);
    }
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

  const handleVolumeChange = (newVolume: number) => {
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
      
      <FileUploader isFullscreen={isFullscreen} onFileUpload={handleFileUpload} />

      {loading && (
        <div className={`text-center ${isFullscreen ? 'text-white' : 'text-gray-600'}`}>
          Loading your music library...
        </div>
      )}

      {currentTrack && (
        <TrackInfo
          trackName={currentTrack.name}
          currentTime={currentTime}
          duration={duration}
          isFullscreen={isFullscreen}
        />
      )}

      <PlayerControls
        isPlaying={isPlaying}
        canPlayPrev={currentTrackIndex > 0}
        canPlayNext={currentTrackIndex < audioFiles.length - 1}
        hasAudioFiles={audioFiles.length > 0}
        isFullscreen={isFullscreen}
        onTogglePlay={togglePlay}
        onPrevTrack={prevTrack}
        onNextTrack={nextTrack}
      />

      <VolumeControl
        volume={volume}
        isMuted={isMuted}
        isFullscreen={isFullscreen}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
      />

      <PlaylistManager
        audioFiles={audioFiles}
        currentTrackIndex={currentTrackIndex}
        isFullscreen={isFullscreen}
        onTrackSelect={setCurrentTrackIndex}
        onDeleteTrack={deleteAudioFile}
      />
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
