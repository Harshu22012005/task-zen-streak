
import { Bot, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 md:px-6 border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DailyTasker AI
            </span>
          </div>
          <p className="text-gray-400 mb-4">© 2024 DailyTasker AI. Powered by Intelligence. Driven by Results.</p>
        </div>
        
        {/* Developer Credits */}
        <div className="text-center border-t border-purple-500/20 pt-6">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <span>Created by</span>
            <a 
              href="https://www.linkedin.com/in/harshad-pakhale-221hp/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 group"
            >
              <span className="font-semibold">Harshad Harishchandra Pakhale</span>
              <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
