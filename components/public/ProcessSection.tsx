"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import {
  Search,
  Target,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";

const defaultSteps = [
  {
    title: "Discovery",
    description: "We map your goals, audience and requirements.",
    icon: Search,
  },
  {
    title: "Strategy",
    description: "We define the architecture, roadmap and success metrics.",
    icon: Target,
  },
  {
    title: "Design",
    description: "We prototype the UX and visual direction.",
    icon: PenTool,
  },
  {
    title: "Development",
    description: "We build in weekly sprints with demos.",
    icon: Code2,
  },
  {
    title: "Testing",
    description: "Automated and manual QA before launch.",
    icon: TestTube2,
  },
  {
    title: "Launch",
    description: "We deploy, monitor and iterate.",
    icon: Rocket,
  },
  {
    title: "Growth",
    description: "Ongoing optimization and feature releases.",
    icon: TrendingUp,
  },
];

interface ProcessSectionProps {
  title?: string | null;
  subtitle?: string | null;
  steps?: { title: string; description: string }[];
}

export function ProcessSection({
  title,
  subtitle,
  steps,
}: ProcessSectionProps) {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const processSteps = steps?.length ? steps : defaultSteps;

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 80%", "end 35%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });
  const dotPos = useTransform(lineProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-card/40 py-16 sm:py-24">
      <div
        className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="animate-blob absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="animate-blob animation-delay-2000 absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title={title ?? "How We Work"}
          subtitle={subtitle}
        />

        <div className="relative mt-14">
          {/* Connecting line */}
          <div
            className="absolute bottom-11 left-11 top-11 w-0.5 bg-border lg:bottom-auto lg:left-0 lg:top-12 lg:h-0.5 lg:w-full"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-indigo-500 via-primary to-sky-400 lg:origin-left lg:bg-gradient-to-r"
              style={
                reduce
                  ? undefined
                  : { scaleX: lineProgress, scaleY: lineProgress }
              }
            />
            {!reduce && (
              <>
                <motion.span
                  className="absolute -ml-1 -mt-1 left-1/2 h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_14px_3px] shadow-sky-400/70 lg:hidden"
                  style={{ top: dotPos }}
                />
                <motion.span
                  className="absolute -ml-1 -mt-1 top-1/2 hidden h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_14px_3px] shadow-sky-400/70 lg:block"
                  style={{ left: dotPos }}
                />
              </>
            )}
          </div>

          <motion.div
            ref={gridRef}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reduce ? 0 : 0.12,
                  delayChildren: 0.05,
                },
              },
            }}
            className="relative grid gap-6 lg:grid-cols-7 lg:gap-6"
          >
            {processSteps.slice(0, 7).map((step, i) => {
              const Icon = defaultSteps[i % defaultSteps.length].icon;
              return (
                <motion.div
                  key={step.title}
                  variants={{
                    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 34 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 90,
                        damping: 16,
                        mass: 0.9,
                      },
                    },
                  }}
                  className="group relative flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_16px_40px_-16px] hover:shadow-primary/30 lg:flex-col lg:items-center lg:p-6 lg:text-center"
                >
                  <div className="relative z-10 shrink-0">
                    <motion.div
                      variants={{
                        hidden: reduce
                          ? { opacity: 0 }
                          : { opacity: 0, scale: 0.4 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 16,
                          },
                        },
                      }}
                      className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/15 to-sky-500/15 text-primary ring-1 ring-primary/25 transition-all duration-300 group-hover:from-indigo-500 group-hover:to-sky-500 group-hover:text-white group-hover:ring-primary/50 group-hover:shadow-[0_0_24px_-6px] group-hover:shadow-primary/60"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <span className="absolute -right-1.5 -top-1.5 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-[10px] font-bold text-white shadow-lg shadow-primary/40 transition-transform duration-300 group-hover:scale-110">
                      {i + 1}
                    </span>
                  </div>

                  <div className="lg:mt-5">
                    <h3 className="font-semibold transition-colors duration-300 group-hover:text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
