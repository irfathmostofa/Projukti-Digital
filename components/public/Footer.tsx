import Link from "next/link";
import { Globe, Share2, Mail, Phone, MapPin, Rss, Link as LinkIcon, Send } from "lucide-react";
import type { Product, Service, SiteSettings } from "@/types";

interface FooterProps {
  settings: SiteSettings | null;
  products: Product[];
  services: Service[];
}

const socialIcons = [
  { key: "facebook", icon: Share2 },
  { key: "linkedin", icon: LinkIcon },
  { key: "instagram", icon: Globe },
  { key: "youtube", icon: Rss },
  { key: "github", icon: Globe },
  { key: "twitter", icon: Send },
] as const;

export function Footer({ settings, products, services }: FooterProps) {
  const s = settings;
  const year = new Date().getFullYear();
  const company = s?.company_name ?? "Nexus Digital";

  const socials = socialIcons
    .map(({ key, icon }) => ({ href: s?.[key], icon, label: key }))
    .filter((x) => x.href);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              {s?.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.logo} alt={company} className="h-8 w-auto" />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                  {company.charAt(0)}
                </span>
              )}
              <span className="text-lg font-semibold">{company}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {s?.description ?? "We build powerful software products, custom digital solutions, and data-driven marketing systems for modern businesses."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {products.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <Link href={`/products/${p.slug}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="font-medium text-primary hover:underline">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.slice(0, 5).map((svc) => (
                <li key={svc.id}>
                  <Link href={`/services/${svc.slug}`} className="text-muted-foreground transition-colors hover:text-primary">
                    {svc.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="font-medium text-primary hover:underline">
                  All Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">About</Link></li>
              <li><Link href="/testimonials" className="text-muted-foreground transition-colors hover:text-primary">Testimonials</Link></li>
              <li><Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground transition-colors hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-muted-foreground transition-colors hover:text-primary">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} {company}. All rights reserved.</p>
          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:gap-5">
            {s?.phone && (
              <a href={`tel:${s.phone}`} className="flex items-center gap-1.5 hover:text-primary">
                <Phone className="h-3.5 w-3.5" /> {s.phone}
              </a>
            )}
            {s?.email && (
              <a href={`mailto:${s.email}`} className="flex items-center gap-1.5 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> {s.email}
              </a>
            )}
            {s?.address && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {s.address}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
