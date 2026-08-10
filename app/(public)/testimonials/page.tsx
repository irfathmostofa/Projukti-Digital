import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { CTASection } from "@/components/shared/CTASection";
import { Pagination } from "@/components/shared/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { getTestimonials, getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

const PER_PAGE = 12;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Testimonials",
    description: "See what our clients say about working with us — real results from real partnerships.",
    siteSettings: settings,
    path: "/testimonials",
  });
}

export default async function TestimonialsPage({ searchParams }: PageProps<"/testimonials">) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(typeof params.page === "string" ? params.page : "1", 10) || 1);

  const all = await getTestimonials();
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const testimonials = all.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="What Our Clients Say"
        description="Real results from real partnerships with businesses across industries."
        breadcrumbs={[{ name: "Testimonials" }]}
      />
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {testimonials.length === 0 ? (
            <EmptyState title="No testimonials yet" description="Check back soon." />
          ) : (
            <>
              <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                  <StaggerItem key={t.id}>
                    <TestimonialCard testimonial={t} />
                  </StaggerItem>
                ))}
              </Stagger>
              <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/testimonials" />
            </>
          )}
        </div>
      </section>
      <CTASection
        title="Become our next success story"
        subtitle="We'd love to help you build something great."
        content={{
          primaryCta: { label: "Get in Touch", url: "/contact" },
          secondaryCta: { label: "Explore Products", url: "/products" },
        }}
      />
    </>
  );
}
