import type { Metadata } from "next";
import { Hero } from "@/components/public/Hero";
import { StatisticsSection } from "@/components/public/StatisticsSection";
import { FeaturedProductsSection } from "@/components/public/FeaturedProductsSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { WhyChooseUsSection } from "@/components/public/WhyChooseUsSection";
import { ProcessSection } from "@/components/public/ProcessSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { CTASection } from "@/components/shared/CTASection";
import {
  getHomepageSections,
  getProducts,
  getServices,
  getSiteSettings,
  getStatistics,
  getTestimonials,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({ siteSettings: settings, path: "/" });
}

export default async function HomePage() {
  const [sections, products, services, testimonials, statistics] = await Promise.all([
    getHomepageSections(),
    getProducts({ featuredOnly: true }),
    getServices(),
    getTestimonials({ featuredOnly: true }),
    getStatistics(),
  ]);

  const getSection = (key: string) => sections.find((s) => s.key === key && s.is_enabled);

  const heroSection = getSection("hero");
  const statsSection = getSection("statistics");
  const featuredSection = getSection("featured_products");
  const servicesSection = getSection("services");
  const whySection = getSection("why_choose_us");
  const processSection = getSection("process");
  const testimonialsSection = getSection("testimonials");
  const ctaSection = getSection("cta");

  return (
    <>
      {heroSection && <Hero section={heroSection} statistics={statistics} />}
      {statsSection && (
        <StatisticsSection
          title={statsSection.title}
          subtitle={statsSection.subtitle}
          statistics={statistics}
        />
      )}
      {featuredSection && (
        <FeaturedProductsSection
          title={featuredSection.title}
          subtitle={featuredSection.subtitle}
          products={products}
        />
      )}
      {servicesSection && (
        <ServicesSection
          title={servicesSection.title}
          subtitle={servicesSection.subtitle}
          services={services}
        />
      )}
      {whySection && <WhyChooseUsSection section={whySection} />}
      {processSection && (
        <ProcessSection
          title={processSection.title}
          subtitle={processSection.subtitle}
          steps={
            (processSection.content as { steps?: { title: string; description: string }[] } | null)
              ?.steps
          }
        />
      )}
      {testimonialsSection && (
        <TestimonialsSection
          title={testimonialsSection.title}
          subtitle={testimonialsSection.subtitle}
          testimonials={testimonials}
        />
      )}
      {ctaSection && (
        <CTASection
          title={ctaSection.title}
          subtitle={ctaSection.subtitle}
          content={ctaSection.content}
        />
      )}
    </>
  );
}
