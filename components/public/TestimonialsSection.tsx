import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  title?: string | null;
  subtitle?: string | null;
  testimonials: Testimonial[];
}

export function TestimonialsSection({ title, subtitle, testimonials }: TestimonialsSectionProps) {
  if (!testimonials.length) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title={title ?? "What Our Clients Say"} subtitle={subtitle} align="left" />
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all testimonials
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.slice(0, 4).map((testimonial) => (
            <StaggerItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
