import "server-only";
import type {
  Product,
  ProductFeature,
  Service,
  ServiceFeature,
  FAQ,
  Testimonial,
  TeamMember,
  SiteSettings,
  HomepageSection,
  NavigationItem,
} from "@/types";
import { isConfigured } from "@/lib/utils";
import * as demo from "@/lib/data/demo";

type QueryResult = {
  data: unknown[] | null;
  error: { message: string } | null;
};

type QueryBuilder = {
  select: (columns?: string) => QueryBuilder;
  eq: (column: string, value: unknown) => QueryBuilder;
  ilike: (column: string, pattern: string) => QueryBuilder;
  or: (filters: string) => QueryBuilder;
  order: (column: string, options?: { ascending?: boolean }) => QueryBuilder;
  limit: (count: number) => QueryBuilder;
  maybeSingle: () => Promise<{ data: unknown | null; error: { message: string } | null }>;
  then: <TResult = QueryResult>(
    onfulfilled?: ((value: QueryResult) => TResult | PromiseLike<TResult>) | null,
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null
  ) => Promise<TResult>;
};

type SupabaseClient = {
  from: (table: string) => QueryBuilder;
};

let clientCache: SupabaseClient | null = null;

async function getClient(): Promise<SupabaseClient | null> {
  if (!isConfigured()) return null;
  if (clientCache) return clientCache;
  const { createClient } = await import("@/lib/supabase/server");
  clientCache = (await createClient()) as unknown as SupabaseClient;
  return clientCache;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const client = await getClient();
  if (!client) return demo.demoSiteSettings;
  const { data, error } = await client.from("site_settings").select("*").limit(1).maybeSingle();
  if (error) return demo.demoSiteSettings;
  return (data as SiteSettings) ?? demo.demoSiteSettings;
}

export async function getHomepageSections(): Promise<HomepageSection[]> {
  const client = await getClient();
  if (!client) return demo.demoHomepageSections;
  const { data, error } = await client
    .from("homepage_sections")
    .select("*")
    .eq("is_enabled", true)
    .order("sort_order");
  if (error) return demo.demoHomepageSections;
  if (!data || data.length === 0) return demo.demoHomepageSections;
  return data as HomepageSection[];
}

export async function getNavigation(): Promise<NavigationItem[]> {
  const client = await getClient();
  if (!client) return demo.demoNavigation;
  const { data, error } = await client
    .from("navigation_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) return demo.demoNavigation;
  if (!data || data.length === 0) return demo.demoNavigation;
  return data as NavigationItem[];
}

export async function getProducts(opts?: { featuredOnly?: boolean }): Promise<Product[]> {
  const client = await getClient();
  if (!client) return demo.demoProducts.filter((p) => (opts?.featuredOnly ? p.is_featured : true));
  let builder = client.from("products").select("*").eq("is_active", true);
  if (opts?.featuredOnly) builder = builder.eq("is_featured", true);
  const { data, error } = await builder.order("sort_order");
  if (error) return [];
  if (!data || data.length === 0) return [];
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const client = await getClient();
  if (!client) {
    return demo.demoProducts.find((p) => p.slug === slug) ?? null;
  }
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) return null;
  return (data as Product) ?? null;
}

export async function getRelatedProducts(currentId: string, category?: string | null, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.id !== currentId && (category ? p.category === category : true))
    .slice(0, limit);
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  return [...new Set(products.map((p) => p.category).filter(Boolean))] as string[];
}

export async function getProductFeatures(productId: string): Promise<ProductFeature[]> {
  const client = await getClient();
  if (!client) return demo.demoProductFeatures(productId);
  const { data, error } = await client
    .from("product_features")
    .select("*")
    .eq("product_id", productId)
    .eq("is_active", true)
    .order("sort_order");
  if (error) return [];
  return (data ?? []) as ProductFeature[];
}

export async function getServices(opts?: { featuredOnly?: boolean }): Promise<Service[]> {
  const client = await getClient();
  if (!client) return demo.demoServices.filter((s) => (opts?.featuredOnly ? s.is_featured : true));
  let builder = client.from("services").select("*").eq("is_active", true);
  if (opts?.featuredOnly) builder = builder.eq("is_featured", true);
  const { data, error } = await builder.order("sort_order");
  if (error) return [];
  if (!data || data.length === 0) return [];
  return data as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const client = await getClient();
  if (!client) {
    return demo.demoServices.find((s) => s.slug === slug) ?? null;
  }
  const { data, error } = await client
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (error) return null;
  return (data as Service) ?? null;
}

export async function getRelatedServices(currentId: string, category?: string | null, limit = 3): Promise<Service[]> {
  const all = await getServices();
  return all
    .filter((s) => s.id !== currentId && (category ? s.category === category : true))
    .slice(0, limit);
}

export async function getServiceFeatures(serviceId: string): Promise<ServiceFeature[]> {
  const client = await getClient();
  if (!client) return demo.demoServiceFeatures(serviceId);
  const { data, error } = await client
    .from("service_features")
    .select("*")
    .eq("service_id", serviceId)
    .eq("is_active", true)
    .order("sort_order");
  if (error) return [];
  return (data ?? []) as ServiceFeature[];
}

export async function getFaqs(parentId: string): Promise<FAQ[]> {
  const client = await getClient();
  if (!client) return demo.demoFaqs(parentId);
  const { data, error } = await client
    .from("faqs")
    .select("*")
    .or(`product_id.eq.${parentId},service_id.eq.${parentId}`)
    .eq("is_active", true)
    .order("sort_order");
  if (error) return [];
  return (data ?? []) as FAQ[];
}

export async function getTestimonials(opts?: { featuredOnly?: boolean }): Promise<Testimonial[]> {
  const client = await getClient();
  if (!client) return demo.demoTestimonials.filter((t) => (opts?.featuredOnly ? t.is_featured : true));
  let builder = client.from("testimonials").select("*").eq("is_active", true);
  if (opts?.featuredOnly) builder = builder.eq("is_featured", true);
  const { data, error } = await builder.order("sort_order");
  if (error) return [];
  if (!data || data.length === 0) return [];
  return data as Testimonial[];
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const client = await getClient();
  if (!client) return demo.demoTeamMembers;
  const { data, error } = await client
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) return [];
  if (!data || data.length === 0) return [];
  return data as TeamMember[];
}

export async function getStatistics() {
  const sections = await getHomepageSections();
  const hero = sections.find((s) => s.key === "hero");
  const stats = hero?.content && typeof hero.content === "object" && "statistics" in hero.content
    ? (hero.content as { statistics: { number: number; suffix?: string; label: string }[] }).statistics
    : null;
  if (Array.isArray(stats) && stats.length > 0) return stats;
  return [
    { number: 50, suffix: "+", label: "Projects Delivered" },
    { number: 30, suffix: "+", label: "Happy Clients" },
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 99, suffix: "%", label: "Client Satisfaction" },
  ];
}
