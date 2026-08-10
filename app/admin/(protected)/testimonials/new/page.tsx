import { AdminHeader } from "@/components/admin/AdminHeader";
import { EntityForm } from "@/components/admin/EntityForm";
import { requireAdmin } from "@/lib/admin/session";

export const dynamic = "force-dynamic";

const fields = [
  { name: "client_name", label: "Client Name", type: "text", required: true },
  { name: "designation", label: "Designation", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "avatar", label: "Avatar URL", type: "text" },
  { name: "testimonial", label: "Testimonial", type: "textarea", textareaRows: 4, required: true },
  { name: "rating", label: "Rating (1–5)", type: "number" },
  { name: "is_featured", label: "Featured", type: "checkbox" },
  { name: "is_active", label: "Active", type: "checkbox" },
  { name: "sort_order", label: "Sort Order", type: "number" },
] as const;

export default async function NewTestimonialPage() {
  await requireAdmin();
  return (
    <>
      <AdminHeader title="New Testimonial" />
      <EntityForm
        table="testimonials"
        fields={fields as never}
        redirectPath="/admin/testimonials"
        submitLabel="Create Testimonial"
      />
    </>
  );
}
