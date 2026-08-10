"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deleteRecord } from "@/lib/admin/actions";
import { formatDate } from "@/lib/utils";

export function MediaTable({ media }: { media: Record<string, unknown>[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onDelete(id: string) {
    if (!confirm("Delete this media asset?")) return;
    startTransition(async () => {
      await deleteRecord("media_assets", id);
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {media.map((m) => {
        const url = String(m.url ?? "");
        const name = String(m.name ?? "Untitled");
        return (
          <div key={String(m.id)} className="group overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-video bg-muted/40">
              {url ? (
                <Image
                  src={url}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No preview
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{formatDate(String(m.created_at))}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                disabled={pending}
                onClick={() => onDelete(String(m.id))}
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
