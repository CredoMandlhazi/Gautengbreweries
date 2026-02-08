import { useEffect } from "react";
import { EventsSection } from "@/components/EventsSection";

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <EventsSection />
    </div>
  );
};

export default Events;
