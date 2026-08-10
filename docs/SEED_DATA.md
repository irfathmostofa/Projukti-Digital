# Seed Data

This project ships with demo seed data so the site is fully populated out of the box. Everything below is clearly marked as **demo content** — replace it through the admin CMS.

## Running the seed

The seed is a SQL migration, so it runs automatically when you apply all migrations:

```bash
supabase db push
```

Or apply the migration manually in the Supabase SQL editor (Project > SQL Editor):

1. `20260101000000_init.sql` — schema, RLS, functions
2. `20260101000001_storage.sql` — storage buckets + policies
3. `20260101000002_seed.sql` — demo data

## What gets seeded

| Table | Contents |
| --- | --- |
| `site_settings` | "Nexus Digital" brand, contact details, social links, default SEO title/description/keywords, default OG image |
| `homepage_sections` | 8 configurable sections (hero, statistics, featured products, services, why choose us, process, testimonials, CTA) with JSON content blocks |
| `navigation_items` | Home, Products, Services, About, Testimonials, Contact |
| `products` | 3 ready-made products (Restaurant POS, School Management, E-commerce) with pricing, images, tech stacks, benefits, SEO fields |
| `product_features` | Feature bullets for each product |
| `services` | 6 services (Web Development, Mobile Apps, Digital Marketing, SEO, E-commerce, Business Automation) |
| `service_features` | Capability bullets for each service |
| `faqs` | Product- and service-linked FAQ entries |
| `testimonials` | 4 client testimonials |
| `team_members` | 4 team members with photos, bios, social links |

## Notes

- All demo image URLs point to Unsplash and are safe to hotlink in development.
- The homepage renders the **demo data automatically when Supabase is not configured** — i.e. without `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`, the site falls back to `lib/data/demo.ts` (a mirror of this seed) so you can preview the design without a database.
- Once Supabase is configured and migrations are applied, the database values take precedence and can be edited from `/admin`.
- To fully reset demo content, re-run `20260101000002_seed.sql`. Inserts for `site_settings` and `homepage_sections` are idempotent (`on conflict ... do nothing`); navigation/products/services use plain inserts and will duplicate on re-run.
