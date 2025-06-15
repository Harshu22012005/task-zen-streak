
interface AnimatedBackgroundProps {
  scrollY: number;
}

const AnimatedBackground = ({ scrollY }: AnimatedBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating AI Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-pink-400/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Neural Network Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path 
            d="M 100 200 Q 300 100 500 200 T 900 200" 
            stroke="url(#neuralGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M 100 400 Q 300 300 500 400 T 900 400" 
            stroke="url(#neuralGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <path 
            d="M 100 600 Q 300 500 500 600 T 900 600" 
            stroke="url(#neuralGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div 
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      ></div>
      <div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
        style={{ transform: `translateY(${-scrollY * 0.3}px)`, animationDelay: '1s' }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
