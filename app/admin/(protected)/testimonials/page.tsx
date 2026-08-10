import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const testimonials = await listRecords("testimonials", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader
        title="Testimonials"
        description="Manage client testimonials."
        href="/admin/testimonials/new"
        actionLabel="New Testimonial"
      />
      {testimonials.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No testimonials yet.
        </p>
      ) : (
        <AdminTable
          table="testimonials"
          editHref="/admin/testimonials"
          columns={[
            { key: "client_name", label: "Client" },
            { key: "company", label: "Company" },
            { key: "rating", label: "Rating" },
            { key: "is_featured", label: "Featured" },
          ]}
          rows={testimonials}
        />
      )}
    </>
  );
}
