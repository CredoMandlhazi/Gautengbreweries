import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" style={{ width: '50%' }}></div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl animate-fade-in-up">
          <h1 className="text-7xl md:text-8xl font-black mb-6 leading-none">
            SUPERBLY
            <br />
            <span className="text-primary text-glow">GAUTENG</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg">
            For the Love of Soccer. For the Love of Beer. Celebrating life, one goal at a time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
            >
              <Link to="/beers">
                OUR BEERS
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-lg px-8 py-6"
            >
              <Link to="/contact">TASTE OF GAUTENG</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};
