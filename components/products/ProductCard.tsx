import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={`${product.name} product preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-transparent">
            <span className="text-4xl font-bold text-primary/30">{product.name.charAt(0)}</span>
          </div>
        )}
        {product.category && (
          <Badge className="absolute left-3 top-3 bg-background/90 backdrop-blur">
            {product.category}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">{product.name}</h3>
        {product.short_description && (
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {product.short_description}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.price && (
              <span className="text-sm font-semibold">{product.price}</span>
            )}
            {product.pricing_type && (
              <span className="ml-1 text-xs text-muted-foreground">/ {product.pricing_type}</span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
            Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
