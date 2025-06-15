
import { Button } from "@/components/ui/button";
import { Bot, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 md:px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
          <Bot className="w-16 h-16 text-purple-400 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to unlock your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI potential?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 opacity-90">
            Join the future of productivity. Let AI transform how you work, think, and achieve.
          </p>
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
              {user ? "Enter AI Dashboard" : "Activate AI Mode"}
              <Code className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
