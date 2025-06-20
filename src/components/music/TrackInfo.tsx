
interface TrackInfoProps {
  trackName: string;
  currentTime: number;
  duration: number;
  isFullscreen?: boolean;
}

const TrackInfo = ({ trackName, currentTime, duration, isFullscreen = false }: TrackInfoProps) => {
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`text-center space-y-2 ${isFullscreen ? 'text-white' : 'text-gray-800'}`}>
      <div className="text-sm opacity-80">Now Playing</div>
      <div className="font-medium">{trackName}</div>
      <div className="text-xs opacity-60">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default TrackInfo;
