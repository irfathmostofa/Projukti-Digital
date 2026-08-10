import { AdminHeader } from "@/components/admin/AdminHeader";
import { SettingsForm, type SettingsField } from "@/components/admin/SettingsForm";
import { requireAdmin } from "@/lib/admin/session";
import { getSiteSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

const fields: SettingsField[] = [
  { name: "company_name", label: "Company Name", required: true, placeholder: "Nexus Digital" },
  { name: "logo", label: "Logo URL", placeholder: "https://..." },
  { name: "favicon", label: "Favicon URL", placeholder: "https://..." },
  { name: "tagline", label: "Tagline", placeholder: "We build software that grows businesses" },
  { name: "description", label: "Description", type: "textarea", textareaRows: 3 },
  { name: "email", label: "Email", placeholder: "hello@example.com" },
  { name: "phone", label: "Phone", placeholder: "+1 (555) 010-2030" },
  { name: "address", label: "Address", type: "textarea", textareaRows: 2 },
  { name: "facebook", label: "Facebook URL", placeholder: "https://facebook.com/..." },
  { name: "linkedin", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
  { name: "instagram", label: "Instagram URL", placeholder: "https://instagram.com/..." },
  { name: "youtube", label: "YouTube URL", placeholder: "https://youtube.com/..." },
  { name: "github", label: "GitHub URL", placeholder: "https://github.com/..." },
  { name: "twitter", label: "Twitter URL", placeholder: "https://twitter.com/..." },
  { name: "whatsapp", label: "WhatsApp", placeholder: "+15550102030" },
  { name: "messenger", label: "Messenger URL", placeholder: "https://m.me/..." },
  { name: "privacy_policy", label: "Privacy Policy URL", placeholder: "/privacy-policy" },
  { name: "terms_and_conditions", label: "Terms & Conditions URL", placeholder: "/terms-and-conditions" },
];

export default async function AdminSettingsPage() {
  await requireAdmin();
  const settings = await getSiteSettings();

  return (
    <>
      <AdminHeader
        title="Site Settings"
        description="Company details, contact info, and social links used across the site."
      />
      <SettingsForm fields={fields} initial={settings as never} />
    </>
  );
}
