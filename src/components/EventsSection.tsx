import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    title: "TASTE OF GAUTENG CAMPAIGN",
    date: "Ongoing",
    time: "Various Times",
    location: "Various Locations",
    description: "Free tastings & events across Gauteng. Experience our full lineup of craft beers.",
  },
  {
    title: "TOWNSHIP FESTIVALS",
    date: "Monthly",
    time: "Weekends",
    location: "Mamelodi & Orlando",
    description: "Celebrating township culture with music, food, and our finest beers.",
  },
  {
    title: "SOCCER TOURNAMENTS",
    date: "Weekends",
    time: "Match Days",
    location: "Local Stadiums",
    description: "Supporting local soccer with refreshments and community spirit.",
  },
];

export const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            UPCOMING <span className="text-primary">EVENTS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join us for tastings, tournaments, and celebrations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <Card
              key={index}
              className="bg-card border-border p-6 hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-4 text-foreground">{event.title}</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{event.description}</p>
              <Link to="/contact" className="w-full">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  LEARN MORE
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
