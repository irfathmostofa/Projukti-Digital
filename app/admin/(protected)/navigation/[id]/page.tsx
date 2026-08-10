import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm, type FieldDef } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getRecord } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "Products" },
  { name: "url", label: "URL", type: "text", required: true, placeholder: "/products" },
  { name: "sort_order", label: "Sort Order", type: "number", help: "Lower numbers appear first." },
  { name: "is_active", label: "Active", type: "checkbox" },
];

export default async function EditNavigationPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const initial = await getRecord("navigation_items", id);
  if (!initial) notFound();

  return (
    <>
      <AdminHeader title="Edit Navigation Item" description="Update this navigation link." />
      <EntityForm
        table="navigation_items"
        fields={fields}
        initial={initial as never}
        redirectPath="/admin/navigation"
        submitLabel="Save Changes"
      />
    </>
  );
}
