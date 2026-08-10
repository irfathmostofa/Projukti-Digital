import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm, type FieldDef } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getRecord } from "@/lib/admin/data";
import { notFound } from "next/navigation";

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

export default async function ServiceFormPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isEdit = Boolean(id);
  const initial = id ? await getRecord("services", id) : null;
  if (id && !initial) notFound();

  return (
    <>
      <AdminHeader
        title={isEdit ? "Edit Service" : "New Service"}
        description={isEdit ? "Update service details." : "Create a new service offering."}
      />
      <EntityForm
        table="services"
        fields={fields}
        initial={initial as never}
        redirectPath="/admin/services"
        submitLabel={isEdit ? "Save Changes" : "Create Service"}
      />
    </>
  );
}
