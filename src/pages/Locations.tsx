import { useEffect } from "react";
import { LocationsSection } from "@/components/LocationsSection";

const Locations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <LocationsSection />
    </div>
  );
};

export default Locations;
