import { AdminHeader } from "@/components/admin/AdminHeader";
import { HomepageSectionsForm } from "@/components/admin/HomepageSectionsForm";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";
import type { HomepageSection } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminPagesPage() {
  await requireAdmin();
  const rows = await listRecords("homepage_sections", { orderBy: "sort_order" });
  const sections = rows as unknown as HomepageSection[];

  return (
    <>
      <AdminHeader
        title="Pages"
        description="Manage homepage sections — content, images, statistics, and enable/disable each section."
      />
      {sections.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No homepage sections found.
        </p>
      ) : (
        <HomepageSectionsForm sections={sections} />
      )}
    </>
  );
}
