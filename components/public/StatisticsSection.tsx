import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

interface StatisticsSectionProps {
  title?: string | null;
  subtitle?: string | null;
  statistics: { number: number; suffix?: string; label: string }[];
}

const DEFAULT_STATS = [
  { number: 50, suffix: "+", label: "Projects Delivered" },
  { number: 30, suffix: "+", label: "Happy Clients" },
  { number: 5, suffix: "+", label: "Years Experience" },
  { number: 99, suffix: "%", label: "Client Satisfaction" },
];

export function StatisticsSection({ title, subtitle, statistics }: StatisticsSectionProps) {
  const stats = statistics.length ? statistics : DEFAULT_STATS;

  return (
    <section className="border-y border-border/60 bg-card py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && <SectionHeading title={title ?? null} subtitle={subtitle ?? null} />}
        <Stagger className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                <AnimatedCounter value={stat.number} suffix={stat.suffix ?? "+"} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
