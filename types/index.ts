export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  price: string | null;
  pricing_type: string | null;
  thumbnail: string | null;
  hero_image: string | null;
  demo_url: string | null;
  video_url: string | null;
  documentation_url: string | null;
  technologies: string[] | null;
  benefits: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  canonical_url: string | null;
  og_image: string | null;
  is_indexed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFeature {
  id: string;
  product_id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  hero_image: string | null;
  icon: string | null;
  benefits: string[] | null;
  technologies: string[] | null;
  process: { title: string; description: string }[] | null;
  pricing: { name: string; price: string; description: string; features: string[] }[] | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  canonical_url: string | null;
  og_image: string | null;
  is_indexed: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeature {
  id: string;
  service_id: string;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  product_id: string | null;
  service_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  designation: string | null;
  company: string | null;
  avatar: string | null;
  testimonial: string;
  rating: number;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string | null;
  bio: string | null;
  photo: string | null;
  linkedin: string | null;
  github: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string | null;
  attachment_url: string | null;
  status: "new" | "contacted" | "in_progress" | "converted" | "closed";
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  logo: string | null;
  favicon: string | null;
  tagline: string | null;
  description: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  facebook: string | null;
  linkedin: string | null;
  instagram: string | null;
  youtube: string | null;
  github: string | null;
  twitter: string | null;
  whatsapp: string | null;
  messenger: string | null;
  default_title: string | null;
  default_description: string | null;
  default_keywords: string | null;
  default_og_image: string | null;
  google_analytics_id: string | null;
  google_search_console_verification: string | null;
  meta_pixel_id: string | null;
  privacy_policy: string | null;
  terms_and_conditions: string | null;
  created_at: string;
  updated_at: string;
}

export interface HomepageSection {
  id: string;
  key: string;
  title: string | null;
  subtitle: string | null;
  content: Json | null;
  is_enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminProfile {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  bucket: string | null;
  size: number | null;
  mime_type: string | null;
  created_at: string;
}

export type LeadStatus = ContactSubmission["status"];
