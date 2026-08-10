import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm, type FieldDef } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true, placeholder: "Web Development" },
  { name: "slug", label: "Slug", type: "slug", required: true },
  { name: "short_description", label: "Short Description", type: "textarea", textareaRows: 2 },
  { name: "description", label: "Full Description", type: "textarea", textareaRows: 6 },
  { name: "category", label: "Category", type: "text" },
  { name: "hero_image", label: "Hero Image URL", type: "text" },
  { name: "icon", label: "Icon", type: "text", help: "Lucide icon name, e.g. Code2" },
  { name: "benefits", label: "Benefits", type: "list" },
  { name: "technologies", label: "Technologies", type: "list" },
  { name: "is_featured", label: "Featured", type: "checkbox" },
  { name: "is_active", label: "Active", type: "checkbox" },
  { name: "sort_order", label: "Sort Order", type: "number" },
  { name: "seo_title", label: "SEO Title", type: "text" },
  { name: "seo_description", label: "SEO Description", type: "textarea", textareaRows: 2 },
  { name: "seo_keywords", label: "SEO Keywords", type: "text" },
  { name: "canonical_url", label: "Canonical URL", type: "text" },
  { name: "og_image", label: "OG Image URL", type: "text" },
  { name: "is_indexed", label: "Indexed", type: "checkbox" },
];

export default async function NewServicePage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="New Service" description="Create a new service offering." />
      <EntityForm table="services" fields={fields} redirectPath="/admin/services" submitLabel="Create Service" />
    </>
  );
}
