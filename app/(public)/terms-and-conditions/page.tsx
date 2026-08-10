import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Terms & Conditions",
    description: "Read the terms and conditions governing use of our website and services.",
    siteSettings: settings,
    path: "/terms-and-conditions",
    robots: { index: true, follow: true },
  });
}

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const content =
    settings?.terms_and_conditions ??
    "This is demo terms and conditions content. Replace it from the admin CMS. By using this website you agree to these terms. All product and service engagements are governed by a written agreement.";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The rules and guidelines for using our services."
        breadcrumbs={[{ name: "Terms & Conditions" }]}
      />
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          {content.split(/\n\n+/).map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
