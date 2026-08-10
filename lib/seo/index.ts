import type { Metadata } from "next";
import type { Product, Service, SiteSettings } from "@/types";
import { getBaseUrl } from "@/lib/utils";

export { getBaseUrl };

export function buildMetadata(opts: {
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  ogImage?: string | null;
  canonical?: string | null;
  robots?: { index?: boolean; follow?: boolean };
  siteSettings?: SiteSettings | null;
  path?: string;
}): Metadata {
  const s = opts.siteSettings;
  const title = opts.title || s?.default_title || "Premium Digital Agency";
  const description = opts.description || s?.default_description || "";
  const keywords = opts.keywords || s?.default_keywords || "";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const path = opts.path || "/";
  const canonical = opts.canonical || `${baseUrl}${path}`;
  const ogImage = opts.ogImage || s?.default_og_image || undefined;
  const index = opts.robots?.index ?? true;
  const follow = opts.robots?.follow ?? true;

  return {
    title: { default: title, template: `%s | ${s?.company_name || "Agency"}` },
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: s?.company_name || "Premium Digital Agency",
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: {
      index,
      follow,
    },
  };
}

export function productMetadata(product: Product, siteSettings?: SiteSettings | null): Metadata {
  return buildMetadata({
    title: product.seo_title || product.name,
    description: product.seo_description || product.short_description || product.description,
    keywords: product.seo_keywords || undefined,
    ogImage: product.og_image || product.hero_image || product.thumbnail || undefined,
    canonical: product.canonical_url || undefined,
    siteSettings,
    path: `/products/${product.slug}`,
    robots: { index: product.is_indexed, follow: true },
  });
}

export function serviceMetadata(service: Service, siteSettings?: SiteSettings | null): Metadata {
  return buildMetadata({
    title: service.seo_title || service.name,
    description: service.seo_description || service.short_description || service.description,
    keywords: service.seo_keywords || undefined,
    ogImage: service.og_image || service.hero_image || undefined,
    canonical: service.canonical_url || undefined,
    siteSettings,
    path: `/services/${service.slug}`,
    robots: { index: service.is_indexed, follow: true },
  });
}

export function organizationJsonLd(settings: SiteSettings | null) {
  const name = settings?.company_name || "Premium Digital Agency";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: baseUrl,
    ...(settings?.logo ? { logo: settings.logo } : {}),
    ...(settings?.email ? { email: settings.email } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(settings?.address ? { address: settings.address } : {}),
    ...(settings?.description ? { description: settings.description } : {}),
    ...(settings?.linkedin ? { sameAs: [settings.linkedin, settings.twitter, settings.facebook].filter(Boolean) } : {}),
  };
}

export function websiteJsonLd(settings: SiteSettings | null) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings?.company_name || "Premium Digital Agency",
    url: baseUrl,
    description: settings?.default_description || settings?.description || undefined,
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function productJsonLd(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    slug: product.slug,
    ...(product.short_description ? { description: product.short_description } : {}),
    image: product.hero_image || product.thumbnail || undefined,
    ...(product.category ? { category: product.category } : {}),
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            price: product.price.replace(/[^0-9.]/g, "") || "0",
            priceCurrency: "USD",
          },
        }
      : {}),
    url: `${baseUrl}/products/${product.slug}`,
  };
}

export function serviceJsonLd(service: Service) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    ...(service.short_description ? { description: service.short_description } : {}),
    image: service.hero_image || undefined,
    provider: {
      "@type": "Organization",
      name: "Premium Digital Agency",
    },
    url: `${baseUrl}/services/${service.slug}`,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
