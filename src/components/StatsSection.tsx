import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2016, label: "Founded", suffix: "", noFormat: true },
  { value: 4, label: "Craft Beers", suffix: "+", noFormat: false },
  { value: 100, label: "Local Retailers", suffix: "+", noFormat: false },
  { value: 120, label: "Billion Market", suffix: "B", noFormat: false },
];

const useCountUp = (end: number, duration: number = 2000, isVisible: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return count;
};

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-accent/10 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isVisible={isVisible} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({
  stat,
  isVisible,
  delay,
}: {
  stat: { value: number; label: string; suffix: string; noFormat?: boolean };
  isVisible: boolean;
  delay: number;
}) => {
  const count = useCountUp(stat.value, 2000, isVisible);

  // Apply formatting only if noFormat is false
  const displayValue = stat.noFormat ? count : count.toLocaleString();

  return (
    <div
      className="text-center animate-count-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="text-5xl md:text-6xl font-black text-primary mb-2">
        {displayValue}
        {stat.suffix}
      </div>
      <div className="text-muted-foreground font-semibold uppercase tracking-wide text-sm">
        {stat.label}
      </div>
    </div>
  );
};
