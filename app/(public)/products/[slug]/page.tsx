import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, ExternalLink, Play, BookOpen, ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { JsonLd } from "@/components/shared/JsonLd";
import { FAQSection } from "@/components/shared/FAQSection";
import { CTASection } from "@/components/shared/CTASection";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getIcon } from "@/components/shared/icon-map";
import { Stagger, StaggerItem, Reveal } from "@/components/animations/Reveal";
import {
  getProductBySlug,
  getProductFeatures,
  getFaqs,
  getRelatedProducts,
  getSiteSettings,
} from "@/lib/data";
import { productMetadata, productJsonLd, faqJsonLd, getBaseUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()]);
  if (!product) return {};
  return productMetadata(product, settings);
}

export default async function ProductDetailPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const [product, features, faqs, related] = await Promise.all([
    getProductBySlug(slug),
    getProductFeatures(slug),
    getFaqs(slug),
    getRelatedProducts(slug),
  ]);

  if (!product) notFound();

  const baseUrl = getBaseUrl();
  const activeFaqs = faqs.filter((f) => f.is_active);
  const breadcrumbItems = [
    { name: "Products", url: "/products" },
    { name: product.name },
  ];

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <JsonLd data={faqJsonLd(activeFaqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/products` },
            { "@type": "ListItem", position: 3, name: product.name, item: `${baseUrl}/products/${product.slug}` },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              {product.category && (
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {product.category}
                </span>
              )}
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{product.name}</h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {product.short_description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {product.demo_url && (
                  <Link
                    href={product.demo_url}
                    target="_blank"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    <Play className="h-4 w-4" />
                    View Live Demo
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </Link>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  Get a Quote
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm">
                {product.price && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Starting at</p>
                    <p className="text-lg font-bold">
                      {product.price}
                      {product.pricing_type && (
                        <span className="ml-1 text-sm font-normal text-muted-foreground">{product.pricing_type}</span>
                      )}
                    </p>
                  </div>
                )}
                {product.technologies && product.technologies.length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Technologies</p>
                    <p className="mt-1 font-medium">{product.technologies.slice(0, 4).join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
            {product.hero_image && (
              <Reveal direction="left" className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src={product.hero_image}
                  alt={`${product.name} — product overview`}
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
      {product.description && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionHeading eyebrow="Overview" title="Product Overview" />
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-4 text-base leading-relaxed text-muted-foreground">
                {product.description.split(/\n\n/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Benefits */}
      {product.benefits && product.benefits.length > 0 && (
        <section className="border-y border-border/60 bg-card/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Benefits" title="Why teams choose this product" />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {product.benefits.map((benefit) => (
                <StaggerItem key={benefit}>
                  <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Features" title="Everything included" />
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      {product.technologies && product.technologies.length > 0 && (
        <section className="border-y border-border/60 bg-card/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Technology" title="Built with a modern stack" />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {product.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* External links */}
      {(product.demo_url || product.documentation_url || product.video_url) && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {product.documentation_url && (
                <Link
                  href={product.documentation_url}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <BookOpen className="h-4 w-4" /> Documentation
                </Link>
              )}
              {product.video_url && (
                <Link
                  href={product.video_url}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  <Play className="h-4 w-4" /> Watch Video
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <div className="border-y border-border/60 bg-card/40">
        <FAQSection
          faqs={activeFaqs}
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about this product."
        />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <SectionHeading eyebrow="Related" title="Explore more products" align="left" />
              <Link href="/products" className="group hidden items-center gap-1.5 text-sm font-semibold text-primary sm:inline-flex">
                View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.slice(0, 3).map((p) => (
                <StaggerItem key={p.id}>
                  <ProductCard product={p} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CTASection
        title={`Ready to deploy ${product.name}?`}
        subtitle="Talk to our team about customizing this product for your business."
        content={{
          primaryCta: { label: "Get in Touch", url: "/contact" },
          secondaryCta: { label: "View Other Products", url: "/products" },
        }}
      />
    </>
  );
}
