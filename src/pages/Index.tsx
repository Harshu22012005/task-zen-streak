
import { useEffect, useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import HeroSection from "@/components/HeroSection";
import AIFeaturesSection from "@/components/AIFeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden">
      <NavigationBar scrollY={scrollY} isVisible={isVisible} />
      <HeroSection scrollY={scrollY} isVisible={isVisible} />
      <AIFeaturesSection />
      <CTASection />
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
};

export default Index;
