import { AdminHeader } from "@/components/admin/AdminHeader";
import { SettingsForm, type SettingsField } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/admin/session";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

const fields: SettingsField[] = [
  { name: "default_title", label: "Default Title", placeholder: "Nexus Digital — Premium Agency" },
  { name: "default_description", label: "Default Description", type: "textarea", textareaRows: 3 },
  { name: "default_keywords", label: "Default Keywords", placeholder: "software agency, digital marketing, ..." },
  { name: "default_og_image", label: "Default OG Image URL", placeholder: "https://..." },
  { name: "google_analytics_id", label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX", help: "Injected as gtag on all pages." },
  { name: "google_search_console_verification", label: "Search Console Verification", placeholder: "e.g. abc123...", help: "Used for site verification in robots.txt / metadata." },
  { name: "meta_pixel_id", label: "Meta Pixel ID", placeholder: "1234567890", help: "Injected as the Meta Pixel on all pages." },
];

export default async function AdminSeoPage() {
  await requireAdmin();
  const settings = await getSiteSettings();

  return (
    <>
      <AdminHeader
        title="SEO Settings"
        description="Global search-engine defaults, analytics, and verification codes."
      />
      <SettingsForm fields={fields} initial={settings as never} />
    </>
  );
}
