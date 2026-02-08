import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { StorySection } from "@/components/StorySection";
import { AgeVerification } from "@/components/AgeVerification";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AgeVerification />
      <HeroSection />
      <StatsSection />
      <StorySection />
    </div>
  );
};

export default Home;
