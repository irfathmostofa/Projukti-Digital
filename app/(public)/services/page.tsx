import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ServiceSearch } from "@/components/services/ServiceSearch";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { getServices, getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const PER_PAGE = 9;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Services",
    description: "Explore our services — custom software, web development, mobile apps, digital marketing, SEO, e-commerce and automation.",
    siteSettings: settings,
    path: "/services",
  });
}

export default async function ServicesPage({ searchParams }: PageProps<"/services">) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.toLowerCase() : "";
  const page = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1);

  const allServices = await getServices();

  const filtered = allServices.filter(
    (s) =>
      !query ||
      s.name.toLowerCase().includes(query) ||
      (s.short_description ?? "").toLowerCase().includes(query) ||
      (s.category ?? "").toLowerCase().includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const services = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Services That Move Your Business"
        description="End-to-end technology and marketing services delivered by senior experts."
        breadcrumbs={[{ name: "Services" }]}
      />
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServiceSearch />
          {services.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                title="No services found"
                description="Try a different search term."
              />
            </div>
          ) : (
            <>
              <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <StaggerItem key={service.id}>
                    <ServiceCard service={service} />
                  </StaggerItem>
                ))}
              </Stagger>
              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/services" />
            </>
          )}
        </div>
      </section>
    </>
  );
}
