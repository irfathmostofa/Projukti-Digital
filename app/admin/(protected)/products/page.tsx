import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminTable } from "@/components/admin/AdminTable";
import { requireAdmin } from "@/lib/admin/session";
import { listRecords } from "@/lib/admin/data";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  const products = await listRecords("products", { orderBy: "created_at" });

  return (
    <>
      <AdminHeader
        title="Products"
        description="Manage your product catalog."
        href="/admin/products/new"
        actionLabel="New Product"
      />
      {products.length === 0 ? (
        <p className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No products yet. Create your first product.
        </p>
      ) : (
        <AdminTable
          table="products"
          editHref="/admin/products"
          columns={[
            { key: "name", label: "Name" },
            { key: "slug", label: "Slug" },
            { key: "category", label: "Category" },
            { key: "price", label: "Price" },
            { key: "is_featured", label: "Featured" },
          ]}
          rows={products}
        />
      )}
    </>
  );
}
