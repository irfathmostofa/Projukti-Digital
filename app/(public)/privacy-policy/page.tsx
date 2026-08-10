import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { getSiteSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "Privacy Policy",
    description: "Read our privacy policy to understand how we collect, use, and protect your information.",
    siteSettings: settings,
    path: "/privacy-policy",
    robots: { index: true, follow: true },
  });
}

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();
  const content =
    settings?.privacy_policy ??
    "This is demo privacy policy content. Replace it from the admin CMS. Nexus Digital is committed to protecting your privacy. We collect information you provide when you contact us and use it solely to respond to your inquiry and improve our services.";

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle and protect your information."
        breadcrumbs={[{ name: "Privacy Policy" }]}
      />
      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-neutral max-w-none">
            {content.split(/\n\n+/).map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
