
interface AnimatedBackgroundProps {
  scrollY: number;
}

const AnimatedBackground = ({ scrollY }: AnimatedBackgroundProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating AI Elements with enhanced animations */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s', animationDuration: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-cyan-400/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-10 w-5 h-5 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-400/40 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Enhanced Neural Network Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="25%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="75%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="neuralGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          
          {/* Animated flowing lines */}
          <path 
            d="M 100 200 Q 300 100 500 200 T 900 200" 
            stroke="url(#neuralGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />
          <path 
            d="M 100 400 Q 300 300 500 400 T 900 400" 
            stroke="url(#neuralGradient2)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s', animationDuration: '4s' }}
          />
          <path 
            d="M 100 600 Q 300 500 500 600 T 900 600" 
            stroke="url(#neuralGradient)" 
            strokeWidth="3" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '2s', animationDuration: '5s' }}
          />
          <path 
            d="M 900 150 Q 700 250 500 150 T 100 150" 
            stroke="url(#neuralGradient2)" 
            strokeWidth="1.5" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.5s', animationDuration: '6s' }}
          />
          
          {/* Connection nodes */}
          <circle cx="500" cy="200" r="8" fill="#3B82F6" opacity="0.6" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <circle cx="300" cy="400" r="6" fill="#8B5CF6" opacity="0.7" className="animate-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="700" cy="600" r="10" fill="#06B6D4" opacity="0.5" className="animate-pulse" style={{ animationDelay: '0s' }} />
        </svg>
      </div>

      {/* Enhanced Gradient Orbs with parallax effect */}
      <div 
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.1}deg)`,
          animationDuration: '4s'
        }}
      ></div>
      <div 
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: `translateY(${-scrollY * 0.3}px) rotate(${-scrollY * 0.05}deg)`, 
          animationDelay: '1s',
          animationDuration: '6s'
        }}
      ></div>
      <div 
        className="absolute top-1/2 -right-20 w-60 h-60 bg-gradient-to-br from-pink-500/15 to-yellow-500/15 rounded-full blur-2xl animate-pulse"
        style={{ 
          transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.15}deg)`,
          animationDelay: '2s',
          animationDuration: '5s'
        }}
      ></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 border border-cyan-400/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 border border-purple-400/40 animate-ping" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-3/4 left-1/6 w-4 h-4 bg-blue-400/20 rotate-12 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
    </div>
  );
};

export default AnimatedBackground;
