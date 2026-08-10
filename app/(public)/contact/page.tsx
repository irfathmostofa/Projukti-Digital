import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/public/ContactForm";
import { getSiteSettings, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Contact Us",
    description: "Get in touch with our team. Tell us about your project and we'll respond within 24 hours.",
    siteSettings: settings,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: settings?.email ?? "hello@nexusdigital.com",
      href: settings?.email ? `mailto:${settings.email}` : undefined,
    },
    {
      icon: Phone,
      label: "Phone",
      value: settings?.phone ?? "+1 (555) 010-2030",
      href: settings?.phone ? `tel:${settings.phone}` : undefined,
    },
    {
      icon: MapPin,
      label: "Office",
      value: settings?.address ?? "500 Innovation Drive, San Francisco, CA",
      href: undefined,
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Mon – Fri, 9:00 AM – 6:00 PM",
      href: undefined,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Something Great Together"
        description="Tell us about your project and our team will get back to you within 24 hours."
        breadcrumbs={[{ name: "Contact" }]}
      />

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold">Contact information</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Prefer to talk directly? Reach us through any of the channels below.
              </p>
              <div className="mt-8 space-y-5">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="font-medium transition-colors hover:text-primary">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h2 className="text-xl font-semibold">Send us a message</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill out the form and we&apos;ll respond within 24 hours.
                </p>
                <div className="mt-8">
                  <ContactForm services={services} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
