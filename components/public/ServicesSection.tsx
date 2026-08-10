import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import type { Service } from "@/types";

interface ServicesSectionProps {
  title?: string | null;
  subtitle?: string | null;
  services: Service[];
}

export function ServicesSection({ title, subtitle, services }: ServicesSectionProps) {
  if (!services.length) return null;

  return (
    <section className="border-t border-border/60 bg-card/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title={title ?? "What We Do"} subtitle={subtitle} align="left" />
          <Link
            href="/services"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
