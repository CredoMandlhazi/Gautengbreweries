import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import storyImage from "@/assets/our-story.jpg";

export const StorySection = () => {
  return (
    <section id="story" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              OUR <span className="text-primary">STORY</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Founded by Mr. Vusi Beauchamp in 2016, Gauteng Breweries is a proudly South African craft beer venture, 
                established to produce premium-quality, locally brewed alcoholic beverages that resonate with both the 
                domestic and international markets.
              </p>
              <p>
                We brew beers that capture the passion of soccer and the lifestyle of our townships. 
                Locally brewed, supporting SA farmers, with unique township + soccer positioning.
              </p>
              <p>
                With scalable production and distinctive, bold branding, we're strategically positioned to address 
                gaps in the growing craft beer industry. For the Love of Soccer. For the Love of Beer.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                <Link to="/contact">TASTE OF GAUTENG</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold"
              >
                <Link to="/beers">OUR BEERS</Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-[4/3] shadow-2xl">
            <img 
              src={storyImage} 
              alt="Gauteng Breweries Founder" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
