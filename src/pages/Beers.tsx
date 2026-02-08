import { useEffect } from "react";
import { BeerGrid } from "@/components/BeerGrid";

const Beers = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <BeerGrid />
    </div>
  );
};

export default Beers;
