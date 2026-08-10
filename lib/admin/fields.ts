import type { FieldDef } from "@/components/admin/EntityForm";
import { listRecords } from "@/lib/admin/data";

export async function getFaqFields(): Promise<FieldDef[]> {
  const products = await listRecords("products", { orderBy: "name" });
  const services = await listRecords("services", { orderBy: "name" });
  return [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Answer", type: "textarea", textareaRows: 4, required: true },
    {
      name: "product_id",
      label: "Linked Product",
      type: "select",
      options: [{ value: "none", label: "— None —" }, ...products.map((p) => ({ value: String(p.id), label: String(p.name) }))],
    },
    {
      name: "service_id",
      label: "Linked Service",
      type: "select",
      options: [{ value: "none", label: "— None —" }, ...services.map((s) => ({ value: String(s.id), label: String(s.name) }))],
    },
    { name: "sort_order", label: "Sort Order", type: "number" },
    { name: "is_active", label: "Active", type: "checkbox" },
  ];
}
