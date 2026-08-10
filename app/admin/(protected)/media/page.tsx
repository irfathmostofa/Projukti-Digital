import { AdminHeader } from "@/components/admin/AdminHeader";
import { MediaTable } from "@/components/admin/MediaTable";
import { MediaUpload } from "@/components/admin/MediaUpload";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  await requireAdmin();
  const media = await listRecords("media_assets", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader
        title="Media"
        description="Manage images and assets used across the site."
      />
      <MediaUpload />
      {media.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No media uploaded yet. Use the uploader above to add your first asset.
        </p>
      ) : (
        <MediaTable media={media as never} />
      )}
    </>
  );
}
