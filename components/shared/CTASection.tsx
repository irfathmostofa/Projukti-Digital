import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/animations/Reveal";
import type { Json } from "@/types";

interface CTASectionProps {
  title: string | null;
  subtitle: string | null;
  content?: Json | null;
}

export function CTASection({ title, subtitle, content }: CTASectionProps) {
  const cta = (content as { primaryCta?: { label?: string; url?: string }; secondaryCta?: { label?: string; url?: string } } | null) ?? null;

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <FadeUp>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title ?? "Ready to build something great?"}
          </h2>
        </FadeUp>
        {subtitle && (
          <FadeUp delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{subtitle}</p>
          </FadeUp>
        )}
        <FadeUp delay={0.2}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            {cta?.primaryCta?.url && (
              <Link
                href={cta.primaryCta.url}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                {cta.primaryCta.label ?? "Get in Touch"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
            {cta?.secondaryCta?.url && (
              <Link
                href={cta.secondaryCta.url}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                {cta.secondaryCta.label ?? "View Our Work"}
              </Link>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
