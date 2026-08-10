import { AdminHeader } from "@/components/admin/AdminHeader";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads = await listRecords("contact_submissions", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader title="Leads" description="Contact form submissions from your site." />
      {leads.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No leads yet.
        </p>
      ) : (
        <LeadsTable leads={leads as never} />
      )}
    </>
  );
}
