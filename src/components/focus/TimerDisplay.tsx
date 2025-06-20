
interface TimerDisplayProps {
  timeLeft: number;
  sessionType: 'work' | 'break';
  isFullscreen?: boolean;
}

const TimerDisplay = ({ timeLeft, sessionType, isFullscreen = false }: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isFullscreen) {
    return (
      <div className="space-y-4">
        <div className="text-lg font-medium opacity-80">
          {sessionType === 'work' ? 'Focus Session' : 'Break Time'}
        </div>
        <div className="text-8xl md:text-9xl font-bold tracking-wider">
          {formatTime(timeLeft)}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {sessionType === 'work' ? 'Work Session' : 'Break Time'}
      </div>
      <div className="text-6xl font-bold text-sky-600 mb-4">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TimerDisplay;
