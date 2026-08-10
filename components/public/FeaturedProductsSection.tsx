import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import type { Product } from "@/types";

interface FeaturedProductsProps {
  title?: string | null;
  subtitle?: string | null;
  products: Product[];
}

export function FeaturedProductsSection({ title, subtitle, products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading title={title ?? "Featured Products"} subtitle={subtitle} align="left" />
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
