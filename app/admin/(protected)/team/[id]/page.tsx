import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getRecord } from "@/lib/admin/data";
import { notFound } from "next/navigation";

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

export default async function TeamFormPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isEdit = Boolean(id);
  const initial = id ? await getRecord("team_members", id) : null;
  if (id && !initial) notFound();

  return (
    <>
      <AdminHeader title={isEdit ? "Edit Team Member" : "New Team Member"} />
      <EntityForm
        table="team_members"
        fields={fields as never}
        initial={initial as never}
        redirectPath="/admin/team"
        submitLabel={isEdit ? "Save Changes" : "Create Member"}
      />
    </>
  );
}
