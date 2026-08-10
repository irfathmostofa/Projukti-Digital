"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Search, Target, PenTool, Code2, TestTube2, Rocket, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const defaultSteps = [
  { title: "Discovery", description: "We map your goals, audience and requirements.", icon: Search },
  { title: "Strategy", description: "We define the architecture, roadmap and success metrics.", icon: Target },
  { title: "Design", description: "We prototype the UX and visual direction.", icon: PenTool },
  { title: "Development", description: "We build in weekly sprints with demos.", icon: Code2 },
  { title: "Testing", description: "Automated and manual QA before launch.", icon: TestTube2 },
  { title: "Launch", description: "We deploy, monitor and iterate.", icon: Rocket },
  { title: "Growth", description: "Ongoing optimization and feature releases.", icon: TrendingUp },
];

interface ProcessSectionProps {
  title?: string | null;
  subtitle?: string | null;
  steps?: { title: string; description: string }[];
}

export function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const processSteps = steps?.length ? steps : defaultSteps;

  return (
    <section className="border-t border-border/60 bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Process" title={title ?? "How We Work"} subtitle={subtitle} />
        <div ref={ref} className="relative mt-14">
          {/* Progress line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border lg:left-0 lg:top-6 lg:h-0.5 lg:w-full" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-primary to-sky-400 lg:origin-left lg:bg-gradient-to-r"
              style={reduce ? { transform: "scaleY(1)" } : undefined}
              initial={reduce ? undefined : { scaleX: 0, scaleY: 0 }}
              animate={inView ? { scaleX: 1, scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </div>

          <div className="grid gap-10 lg:grid-cols-7">
            {processSteps.slice(0, 7).map((step, i) => {
              const Icon = defaultSteps[i % defaultSteps.length].icon;
              return (
                <motion.div
                  key={step.title}
                  initial={reduce ? undefined : { opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: reduce ? 0 : 0.15 + i * 0.12, duration: 0.5, ease: "easeOut" }}
                  className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-card shadow-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <div className="lg:mt-4">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
