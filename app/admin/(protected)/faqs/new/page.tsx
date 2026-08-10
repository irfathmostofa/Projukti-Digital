import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getFaqFields } from "@/lib/admin/fields";

export const dynamic = "force-dynamic";

export default async function NewFaqPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="New FAQ" />
      <EntityForm table="faqs" fields={await getFaqFields()} redirectPath="/admin/faqs" submitLabel="Create FAQ" />
    </>
  );
}
