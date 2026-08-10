import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductCard } from "@/components/products/ProductCard";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { getProductCategories, getProducts, getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const PER_PAGE = 9;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Products",
    description: "Browse our ready-made software products — restaurant POS, school management, inventory systems and more.",
    siteSettings: settings,
    path: "/products",
  });
}

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.toLowerCase() : "";
  const category = typeof params.category === "string" ? params.category : "";
  const page = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1);

  const [allProducts, categories] = await Promise.all([getProducts(), getProductCategories()]);

  const filtered = allProducts.filter((p) => {
    const matchesCategory = !category || p.category === category;
    const matchesQuery =
      !query ||
      p.name.toLowerCase().includes(query) ||
      (p.short_description ?? "").toLowerCase().includes(query) ||
      (p.category ?? "").toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const products = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Ready-Made Software Products"
        description="Deploy proven, production-grade products in days — fully customizable to your business."
        breadcrumbs={[{ name: "Products" }]}
      />
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductFilters categories={categories} />
          {products.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                title="No products found"
                description="Try adjusting your search or category filter."
              />
            </div>
          ) : (
            <>
              <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </Stagger>
              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/products" />
            </>
          )}
        </div>
      </section>
    </>
  );
}
