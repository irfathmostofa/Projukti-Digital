import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
      <Quote className="h-6 w-6 text-primary/30" aria-hidden="true" />
      <div className="mt-3 flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{testimonial.testimonial}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-muted">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={`${testimonial.client_name} avatar`}
              fill
              sizes="44px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
              {getInitials(testimonial.client_name)}
            </span>
          )}
        </div>
        <div>
          <div className="text-sm font-semibold">{testimonial.client_name}</div>
          <div className="text-xs text-muted-foreground">
            {[testimonial.designation, testimonial.company].filter(Boolean).join(" · ")}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
