import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { JsonLd } from "@/components/shared/JsonLd";
import { FAQSection } from "@/components/shared/FAQSection";
import { CTASection } from "@/components/shared/CTASection";
import { ServiceCard } from "@/components/services/ServiceCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getIcon } from "@/components/shared/icon-map";
import { Stagger, StaggerItem, Reveal } from "@/components/animations/Reveal";
import {
  getServiceBySlug,
  getServiceFeatures,
  getFaqs,
  getRelatedServices,
  getTestimonials,
  getSiteSettings,
} from "@/lib/data";
import { serviceMetadata, serviceJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [service, settings] = await Promise.all([getServiceBySlug(slug), getSiteSettings()]);
  if (!service) return {};
  return serviceMetadata(service, settings);
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const [service, features, faqs, related, testimonials] = await Promise.all([
    getServiceBySlug(slug),
    getServiceFeatures(slug),
    getFaqs(slug),
    getRelatedServices(slug),
    getTestimonials(),
  ]);

  if (!service) notFound();

  const baseUrl = getBaseUrl();
  const activeFaqs = faqs.filter((f) => f.is_active);
  const process = service.process as { title: string; description: string }[] | null | undefined;
  const pricing = service.pricing as
    | { name: string; price: string; description: string; features: string[] }[]
    | null
    | undefined;

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(activeFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
            { "@type": "ListItem", position: 3, name: service.name, item: `${baseUrl}/services/${service.slug}` },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
        <div className="absolute -top-24 left-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb items={[{ name: "Services", url: "/services" }, { name: service.name }]} />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              {service.category && (
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {service.category}
                </span>
              )}
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{service.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {service.short_description}
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              {service.benefits && service.benefits.length > 0 && (
                <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {service.hero_image && (
              <Reveal direction="left" className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src={service.hero_image}
                  alt={`${service.name} — service overview`}
                  width={1200}
                  height={800}
                  priority
                  className="h-auto w-full object-cover"
                />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Overview */}
      {service.description && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionHeading eyebrow="Overview" title="Service Overview" />
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                {service.description.split(/\n\n/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="border-y border-border/60 bg-card/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Features" title="What you get" />
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <StaggerItem key={feature.id}>
                    <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="mt-4 font-semibold">{feature.title}</h3>
                      {feature.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* Technologies */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Technology" title="Tools we use" />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {service.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Process */}
      {process && process.length > 0 && (
        <section className="border-y border-border/60 bg-card/40 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Process" title="How we deliver" />
            <Stagger className="mt-10 space-y-4">
              {process.map((step, i) => (
                <StaggerItem key={step.title}>
                  <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      {step.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Pricing */}
      {pricing && pricing.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Pricing" title="Packages" />
            <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
              {pricing.map((pkg) => (
                <StaggerItem key={pkg.name}>
                  <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="font-semibold">{pkg.name}</h3>
                    <p className="mt-3 text-3xl font-bold">{pkg.price}</p>
                    {pkg.description && <p className="mt-2 text-sm text-muted-foreground">{pkg.description}</p>}
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center justify-center rounded-full border border-primary/40 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Choose {pkg.name}
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="border-y border-border/60 bg-card/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Testimonials" title="What clients say" />
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.slice(0, 4).map((t) => (
                <StaggerItem key={t.id}>
                  <TestimonialCard testimonial={t} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection
        faqs={activeFaqs}
        title="Frequently Asked Questions"
        subtitle="Common questions about this service."
      />

      {/* Related services */}
      {related.length > 0 && (
        <section className="border-t border-border/60 bg-card/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Related" title="Explore more services" />
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((svc) => (
                <StaggerItem key={svc.id}>
                  <ServiceCard service={svc} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to start with ${service.name}?`}
        subtitle="Let's discuss your project and build a plan that fits your goals and budget."
        content={{
          primaryCta: { label: "Get in Touch", url: "/contact" },
          secondaryCta: { label: "View Other Services", url: "/services" },
        }}
      />
    </>
  );
}
