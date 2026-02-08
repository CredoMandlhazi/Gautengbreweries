import { Card } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";

const locations = [
  {
    name: "The Stadium Pub",
    city: "Downtown",
    type: "Sports Bar",
  },
  {
    name: "Champions Lounge",
    city: "Midtown",
    type: "Premium Bar",
  },
  {
    name: "Victory Tavern",
    city: "Riverside",
    type: "Traditional Pub",
  },
  {
    name: "Pitch & Pint",
    city: "Westside",
    type: "Gastropub",
  },
  {
    name: "Goal Line Bar",
    city: "Harbor District",
    type: "Waterfront Bar",
  },
  {
    name: "Striker's Den",
    city: "Old Town",
    type: "Craft Beer Bar",
  },
];

export const LocationsSection = () => {
  return (
    <section id="locations" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            PARTNER <span className="text-primary">BARS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find our beers at these championship venues across the city
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover-lift group cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {location.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    {location.city}
                  </div>
                </div>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded">
                {location.type}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">Want to carry our beers at your establishment?</p>
          <a
            href="#"
            className="text-primary font-bold text-lg hover:text-primary/80 transition-colors inline-flex items-center gap-2"
          >
            BECOME A PARTNER
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
