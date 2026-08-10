import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm, type FieldDef } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";
import { getRecord } from "@/lib/admin/data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { name: "client_name", label: "Client Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "avatar", label: "Avatar URL", type: "text" },
  { name: "testimonial", label: "Testimonial", type: "textarea", textareaRows: 4, required: true },
  { name: "rating", label: "Rating (1–5)", type: "number" },
  { name: "is_featured", label: "Featured", type: "checkbox" },
  { name: "is_active", label: "Active", type: "checkbox" },
  { name: "sort_order", label: "Sort Order", type: "number" },
];

export default async function TestimonialFormPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isEdit = Boolean(id);
  const initial = id ? await getRecord("testimonials", id) : null;
  if (id && !initial) notFound();

  return (
    <>
      <AdminHeader title={isEdit ? "Edit Testimonial" : "New Testimonial"} />
      <EntityForm
        table="testimonials"
        fields={fields}
        initial={initial as never}
        redirectPath="/admin/testimonials"
        submitLabel={isEdit ? "Save Changes" : "Create Testimonial"}
      />
    </>
  );
}
