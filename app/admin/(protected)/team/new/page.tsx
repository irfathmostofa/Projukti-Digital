import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text" },
  { name: "bio", label: "Bio", type: "textarea", textareaRows: 4 },
  { name: "photo", label: "Photo URL", type: "text" },
  { name: "linkedin", label: "LinkedIn URL", type: "text" },
  { name: "github", label: "GitHub URL", type: "text" },
  { name: "is_active", label: "Active", type: "checkbox" },
  { name: "sort_order", label: "Sort Order", type: "number" },
] as const;

export default async function NewTeamMemberPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="New Team Member" />
      <EntityForm
        table="team_members"
        fields={fields as never}
        redirectPath="/admin/team"
        submitLabel="Create Member"
      />
    </>
  );
}
