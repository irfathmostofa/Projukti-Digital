import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm, type FieldDef } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getRecord } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true, placeholder: "POS System Pro" },
  { name: "slug", label: "Slug", type: "slug", required: true },
  { name: "short_description", label: "Short Description", type: "textarea", textareaRows: 2 },
  { name: "description", label: "Full Description", type: "textarea", textareaRows: 6 },
  { name: "category", label: "Category", type: "text", placeholder: "POS / SaaS / E-commerce" },
  { name: "price", label: "Price", type: "text", placeholder: "$499/mo" },
  { name: "pricing_type", label: "Pricing Type", type: "text", placeholder: "monthly / one-time / custom" },
  { name: "thumbnail", label: "Thumbnail URL", type: "text" },
  { name: "hero_image", label: "Hero Image URL", type: "text" },
  { name: "demo_url", label: "Demo URL", type: "text" },
  { name: "video_url", label: "Video URL", type: "text" },
  { name: "documentation_url", label: "Documentation URL", type: "text" },
  { name: "technologies", label: "Technologies", type: "list" },
  { name: "benefits", label: "Benefits", type: "list" },
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

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const product = await getRecord("products", id);
  if (!product) notFound();

  return (
    <>
      <AdminHeader title={`Edit: ${String(product.name ?? "Product")}`} description="Update product details." />
      <EntityForm
        table="products"
        fields={fields}
        initial={product as never}
        redirectPath="/admin/products"
        submitLabel="Save Changes"
      />
    </>
  );
}
