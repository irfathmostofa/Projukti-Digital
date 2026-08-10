import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { renderIcon } from "@/components/shared/icon-map";
import { Badge } from "@/components/ui/badge";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      {service.hero_image && (
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary to-sky-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      )}
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
          {renderIcon(service.icon, "h-5 w-5")}
        </span>
        {service.is_featured && <Badge variant="secondary">Featured</Badge>}
      </div>
      <h3 className="mt-5 text-lg font-semibold transition-colors group-hover:text-primary">{service.name}</h3>
      {service.short_description && (
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.short_description}
        </p>
      )}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{service.category}</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
