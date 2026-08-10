import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminNavigationPage() {
  await requireAdmin();
  const items = await listRecords("navigation_items", { orderBy: "sort_order" });

  return (
    <>
      <AdminHeader
        title="Navigation"
        description="Manage the links shown in the site header."
        href="/admin/navigation/new"
        actionLabel="New Item"
      />
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No navigation items yet. Create your first item.
        </p>
      ) : (
        <AdminTable
          table="navigation_items"
          editHref="/admin/navigation"
          columns={[
            { key: "label", label: "Label" },
            { key: "url", label: "URL" },
            { key: "sort_order", label: "Order" },
            { key: "is_active", label: "Active" },
          ]}
          rows={items}
        />
      )}
    </>
  );
}
