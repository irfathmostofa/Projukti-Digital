"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteRecord, toggleStatus } from "@/lib/admin/actions";
import { Switch } from "@/components/ui/switch";

export function AdminTable({
  columns,
  rows,
  editHref,
  table,
}: {
  columns: { key: string; label: string }[];
  rows: Record<string, unknown>[];
  editHref: string;
  table: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="border-b border-border bg-muted/50">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 font-medium text-muted-foreground">
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr key={String(row.id)} className="hover:bg-muted/30">
              {columns.map((c) => (
                <td key={c.key} className="max-w-[260px] truncate px-4 py-3">
                  {typeof row[c.key] === "boolean" ? (
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        row[c.key] ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {row[c.key] ? "Yes" : "No"}
                    </span>
                  ) : row[c.key] === null || row[c.key] === undefined || row[c.key] === "" ? (
                    "—"
                  ) : (
                    String(row[c.key])
                  )}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Button asChild variant="ghost" size="icon" title="Edit">
                    <Link href={`${editHref}/${row.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <ActiveToggle table={table} id={String(row.id)} active={Boolean(row.is_active)} />
                  <DeleteButton table={table} id={String(row.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActiveToggle({ table, id, active }: { table: string; id: string; active: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Switch
      checked={active}
      disabled={pending}
      onCheckedChange={(v) => {
        startTransition(async () => {
          await toggleStatus(table, id, "is_active", v);
          router.refresh();
        });
      }}
      title="Toggle active"
    />
  );
}

function DeleteButton({ table, id }: { table: string; id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (!confirm("Delete this record? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteRecord(table, id);
      router.refresh();
    });
  }

  return (
    <Button variant="ghost" size="icon" title="Delete" disabled={pending} onClick={onDelete}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
    </Button>
  );
}
