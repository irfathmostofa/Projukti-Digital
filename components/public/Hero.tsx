"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import type { HomepageSection } from "@/types";

interface HeroProps {
  section: HomepageSection;
  statistics: { number: number; suffix?: string; label: string }[];
}

export function Hero({ section, statistics }: HeroProps) {
  const reduce = useReducedMotion();
  const content =
    (section.content as {
      badge?: string;
      primaryCta?: { label?: string; url?: string };
      secondaryCta?: { label?: string; url?: string };
      heroImage?: string;
      statistics?: { number: number; suffix?: string; label: string }[];
    } | null) ?? {};

  const badge = content.badge ?? "Premium Software & Digital Agency";
  const heading = section.title ?? "Build Smarter. Grow Faster.";
  const description =
    section.subtitle ??
    "We build powerful software products, custom digital solutions, and data-driven marketing systems for modern businesses.";
  const primaryCta = content.primaryCta ?? {
    label: "Explore Products",
    url: "/products",
  };
  const secondaryCta = content.secondaryCta ?? {
    label: "Start Your Project",
    url: "/contact",
  };
  const heroImage = content.heroImage;
  const stats =
    Array.isArray(content.statistics) && content.statistics.length
      ? content.statistics
      : statistics;

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: "easeOut" as const },
  });

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="animate-blob absolute -left-24 top-24 h-72 w-72 rounded-full bg-sky-400/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="animate-blob animation-delay-2000 absolute -right-24 top-40 h-72 w-72 rounded-full bg-indigo-400/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {badge}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              {heading}
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              {description}
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={primaryCta.url ?? "/products"}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
              >
                {primaryCta.label ?? "Explore Products"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={secondaryCta.url ?? "/contact"}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Play className="h-4 w-4" />
                {secondaryCta.label ?? "Start Your Project"}
              </Link>
            </motion.div>

            {/* Statistics */}
            {stats.length > 0 && (
              <motion.dl
                {...fadeUp(0.4)}
                className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
              >
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-3xl font-bold text-foreground sm:text-4xl">
                      {stat.number}
                      <span className="text-primary">{stat.suffix ?? "+"}</span>
                    </dd>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.dl>
            )}
          </div>

          {/* Hero visual */}
          <motion.div
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            {heroImage ? (
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src={heroImage}
                  alt="Digital product dashboard preview"
                  width={1280}
                  height={960}
                  priority
                  className="h-auto w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-sky-400/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 p-10">
                    {[
                      { h: "h-24", color: "bg-primary/80" },
                      { h: "h-16", color: "bg-sky-400/70" },
                      { h: "h-28", color: "bg-indigo-400/70" },
                      { h: "h-20", color: "bg-violet-400/70" },
                      { h: "h-24", color: "bg-primary/70" },
                      { h: "h-14", color: "bg-sky-400/60" },
                    ].map((bar, i) => (
                      <div
                        key={i}
                        className={`${bar.h} ${bar.color} rounded-lg opacity-80`}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-border bg-background/80 p-4 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Monthly Revenue
                      </p>
                      <p className="text-xl font-bold">$128,400</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-500">
                      +24.5%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
