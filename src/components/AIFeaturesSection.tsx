
import { Brain, Zap, Sparkles } from "lucide-react";

const AIFeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Neural Task Analysis",
      description: "AI algorithms analyze your work patterns and suggest optimal task scheduling for maximum productivity.",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0s"
    },
    {
      icon: Zap,
      title: "Intelligent Automation",
      description: "Smart workflows that adapt to your habits and automatically organize your daily tasks.",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.2s"
    },
    {
      icon: Sparkles,
      title: "Predictive Insights",
      description: "Machine learning models predict your productivity patterns and recommend optimal work times.",
      gradient: "from-cyan-500 to-blue-500",
      delay: "0.4s"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Productivity Revolution
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to transform how you manage tasks and achieve goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
              style={{ animationDelay: feature.delay }}
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-600/30 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeaturesSection;
