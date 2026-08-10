-- =============================================================
-- Premium Digital Agency Website — Database Schema
-- Run this migration in the Supabase SQL editor or via:
--   supabase db push  /  supabase migration up
-- =============================================================

create extension if not exists "uuid-ossp";

-- -------------------------------------------------------------
-- site_settings — global site configuration
-- -------------------------------------------------------------
create table if not exists public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null default 'Nexus Digital',
  logo text,
  favicon text,
  tagline text,
  description text,
  email text,
  phone text,
  address text,
  facebook text,
  linkedin text,
  instagram text,
  youtube text,
  github text,
  twitter text,
  whatsapp text,
  messenger text,
  default_title text,
  default_description text,
  default_keywords text,
  default_og_image text,
  google_analytics_id text,
  google_search_console_verification text,
  meta_pixel_id text,
  privacy_policy text,
  terms_and_conditions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- homepage_sections — configurable homepage sections
-- -------------------------------------------------------------
create table if not exists public.homepage_sections (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique,
  title text,
  subtitle text,
  content jsonb,
  is_enabled boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- products
-- -------------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  category text,
  price text,
  pricing_type text,
  thumbnail text,
  hero_image text,
  demo_url text,
  video_url text,
  documentation_url text,
  technologies text[],
  benefits text[],
  is_featured boolean not null default false,
  is_active boolean not null default true,
  is_indexed boolean not null default true,
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  seo_keywords text,
  canonical_url text,
  og_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- product_features
-- -------------------------------------------------------------
create table if not exists public.product_features (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  title text not null,
  description text,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_product_features_product on public.product_features(product_id);

-- -------------------------------------------------------------
-- product_screenshots
-- -------------------------------------------------------------
create table if not exists public.product_screenshots (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists idx_product_screenshots_product on public.product_screenshots(product_id);

-- -------------------------------------------------------------
-- services
-- -------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  category text,
  hero_image text,
  icon text,
  benefits text[],
  technologies text[],
  process jsonb,
  pricing jsonb,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  is_indexed boolean not null default true,
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  seo_keywords text,
  canonical_url text,
  og_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- service_features
-- -------------------------------------------------------------
create table if not exists public.service_features (
  id uuid primary key default uuid_generate_v4(),
  service_id uuid not null references public.services(id) on delete cascade,
  title text not null,
  description text,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_service_features_service on public.service_features(service_id);

-- -------------------------------------------------------------
-- faqs — shared table; must belong to exactly one parent
-- -------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default uuid_generate_v4(),
  question text not null,
  answer text not null,
  product_id uuid references public.products(id) on delete cascade,
  service_id uuid references public.services(id) on delete cascade,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint faq_parent_exists check (
    (product_id is not null and service_id is null)
    or
    (product_id is null and service_id is not null)
  )
);

create index if not exists idx_faqs_product on public.faqs(product_id);
create index if not exists idx_faqs_service on public.faqs(service_id);

-- -------------------------------------------------------------
-- testimonials
-- -------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  designation text,
  company text,
  avatar text,
  testimonial text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- team_members
-- -------------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  designation text,
  bio text,
  photo text,
  linkedin text,
  github text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- contact_submissions (leads) — never publicly readable
-- -------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  company text,
  service text,
  budget text,
  message text,
  attachment_url text,
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'converted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- navigation_items
-- -------------------------------------------------------------
create table if not exists public.navigation_items (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  url text not null,
  parent_id uuid references public.navigation_items(id) on delete set null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- admin_profiles — maps auth.users to admin role
-- -------------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- -------------------------------------------------------------
-- media_assets — registry of uploaded storage objects
-- -------------------------------------------------------------
create table if not exists public.media_assets (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  url text not null,
  bucket text,
  size bigint,
  mime_type text,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- updated_at triggers
-- -------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger products_updated_at before update on public.products
  for each row execute function public.handle_updated_at();
create or replace trigger product_features_updated_at before update on public.product_features
  for each row execute function public.handle_updated_at();
create or replace trigger services_updated_at before update on public.services
  for each row execute function public.handle_updated_at();
create or replace trigger service_features_updated_at before update on public.service_features
  for each row execute function public.handle_updated_at();
create or replace trigger faqs_updated_at before update on public.faqs
  for each row execute function public.handle_updated_at();
create or replace trigger testimonials_updated_at before update on public.testimonials
  for each row execute function public.handle_updated_at();
create or replace trigger team_members_updated_at before update on public.team_members
  for each row execute function public.handle_updated_at();
create or replace trigger contact_submissions_updated_at before update on public.contact_submissions
  for each row execute function public.handle_updated_at();
create or replace trigger navigation_items_updated_at before update on public.navigation_items
  for each row execute function public.handle_updated_at();
create or replace trigger admin_profiles_updated_at before update on public.admin_profiles
  for each row execute function public.handle_updated_at();
create or replace trigger site_settings_updated_at before update on public.site_settings
  for each row execute function public.handle_updated_at();
create or replace trigger homepage_sections_updated_at before update on public.homepage_sections
  for each row execute function public.handle_updated_at();

-- -------------------------------------------------------------
-- helper: is current user an admin?
-- -------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_profiles ap
    where ap.user_id = auth.uid()
  );
$$;

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY
-- -------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.homepage_sections enable row level security;
alter table public.products enable row level security;
alter table public.product_features enable row level security;
alter table public.product_screenshots enable row level security;
alter table public.services enable row level security;
alter table public.service_features enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.team_members enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.navigation_items enable row level security;
alter table public.admin_profiles enable row level security;
alter table public.media_assets enable row level security;

-- Public read policies (only published/active content)
create policy "public_read_site_settings" on public.site_settings
  for select using (true);
create policy "public_read_homepage_sections" on public.homepage_sections
  for select using (true);
create policy "public_read_products" on public.products
  for select using (is_active = true);
create policy "public_read_product_features" on public.product_features
  for select using (is_active = true);
create policy "public_read_product_screenshots" on public.product_screenshots
  for select using (true);
create policy "public_read_services" on public.services
  for select using (is_active = true);
create policy "public_read_service_features" on public.service_features
  for select using (is_active = true);
create policy "public_read_faqs" on public.faqs
  for select using (is_active = true);
create policy "public_read_testimonials" on public.testimonials
  for select using (is_active = true);
create policy "public_read_team" on public.team_members
  for select using (is_active = true);
create policy "public_read_navigation" on public.navigation_items
  for select using (is_active = true);
create policy "public_read_media" on public.media_assets
  for select using (true);

-- Public insert (contact form submissions)
create policy "public_insert_contact_submissions" on public.contact_submissions
  for insert with check (true);

-- Admin write policies — authenticated admins have full CRUD
create policy "admin_write_site_settings" on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_homepage_sections" on public.homepage_sections
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_products" on public.products
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_product_features" on public.product_features
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_product_screenshots" on public.product_screenshots
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_services" on public.services
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_service_features" on public.service_features
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_faqs" on public.faqs
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_testimonials" on public.testimonials
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_team" on public.team_members
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_contact_submissions" on public.contact_submissions
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_navigation" on public.navigation_items
  for all using (public.is_admin()) with check (public.is_admin());
create policy "admin_write_media" on public.media_assets
  for all using (public.is_admin()) with check (public.is_admin());

-- admin_profiles: owner can read their own, admins can manage all
create policy "admin_profiles_owner_read" on public.admin_profiles
  for select using (auth.uid() = user_id or public.is_admin());
create policy "admin_profiles_admin_write" on public.admin_profiles
  for all using (public.is_admin()) with check (public.is_admin());
