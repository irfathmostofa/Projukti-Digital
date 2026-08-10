import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  await requireAdmin();
  const faqs = await listRecords("faqs", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader
        title="FAQs"
        description="Manage frequently asked questions."
        href="/admin/faqs/new"
        actionLabel="New FAQ"
      />
      {faqs.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No FAQs yet.
        </p>
      ) : (
        <AdminTable
          table="faqs"
          editHref="/admin/faqs"
          columns={[
            { key: "question", label: "Question" },
            { key: "product_id", label: "Product ID" },
            { key: "service_id", label: "Service ID" },
          ]}
          rows={faqs}
        />
      )}
    </>
  );
}
