import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import type { HomepageSection } from "@/types";

interface WhyChooseUsProps {
  section: HomepageSection;
}

export function WhyChooseUsSection({ section }: WhyChooseUsProps) {
  const content = (section.content as { points?: string[] } | null) ?? {};
  const points = content.points?.length
    ? content.points
    : [
        "Senior engineers only",
        "Transparent pricing",
        "On-time delivery",
        "Long-term partnership",
        "Post-launch support",
        "Results-focused",
      ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Choose Us"
              title={section.title}
              subtitle={section.subtitle}
              align="left"
            />
            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <StaggerItem key={point}>
                  <div className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{point}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8">
              <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
              <div className="relative">
                <h3 className="text-xl font-bold">Our Commitment</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  We treat your project like our own. From the first call to post-launch support, you get a senior team that communicates clearly, ships on time, and obsesses over your results.
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    { value: "24h", label: "Response time" },
                    { value: "99.9%", label: "Uptime guarantee" },
                    { value: "100%", label: "Code ownership" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-primary">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
