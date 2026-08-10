import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getRecord } from "@/lib/admin/data";
import { getFaqFields } from "@/lib/admin/fields";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function FaqFormPage({ params }: { params: Promise<{ id?: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const isEdit = Boolean(id);
  const initial = id ? await getRecord("faqs", id) : null;
  if (id && !initial) notFound();

  return (
    <>
      <AdminHeader title={isEdit ? "Edit FAQ" : "New FAQ"} />
      <EntityForm
        table="faqs"
        fields={await getFaqFields()}
        initial={initial as never}
        redirectPath="/admin/faqs"
        submitLabel={isEdit ? "Save Changes" : "Create FAQ"}
      />
    </>
  );
}
