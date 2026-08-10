import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  await requireAdmin();
  const members = await listRecords("team_members", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader
        title="Team"
        description="Manage team members shown on the About page."
        href="/admin/team/new"
        actionLabel="New Member"
      />
      {members.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No team members yet.
        </p>
      ) : (
        <AdminTable
          table="team_members"
          editHref="/admin/team"
          columns={[
            { key: "name", label: "Name" },
            { key: "designation", label: "Designation" },
          ]}
          rows={members}
        />
      )}
    </>
  );
}
