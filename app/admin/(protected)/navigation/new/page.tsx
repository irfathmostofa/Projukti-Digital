import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm, type FieldDef } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "label", label: "Label", type: "text", required: true, placeholder: "Products" },
  { name: "url", label: "URL", type: "text", required: true, placeholder: "/products" },
  { name: "sort_order", label: "Sort Order", type: "number", help: "Lower numbers appear first." },
  { name: "is_active", label: "Active", type: "checkbox" },
];

export default async function NewNavigationPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="New Navigation Item" description="Add a link to the site navigation." />
      <EntityForm table="navigation_items" fields={fields} redirectPath="/admin/navigation" submitLabel="Create Item" />
    </>
  );
}
