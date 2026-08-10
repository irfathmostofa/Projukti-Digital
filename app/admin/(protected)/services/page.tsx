import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  await requireAdmin();
  const services = await listRecords("services", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader
        title="Services"
        description="Manage your service offerings."
        href="/admin/services/new"
        actionLabel="New Service"
      />
      {services.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No services yet. Create your first service.
        </p>
      ) : (
        <AdminTable
          table="services"
          editHref="/admin/services"
          columns={[
            { key: "name", label: "Name" },
            { key: "slug", label: "Slug" },
            { key: "category", label: "Category" },
            { key: "is_featured", label: "Featured" },
          ]}
          rows={services}
        />
      )}
    </>
  );
}
