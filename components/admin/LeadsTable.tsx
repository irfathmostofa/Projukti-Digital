"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateRecord, deleteRecord } from "@/lib/admin/actions";
import { formatDate } from "@/lib/utils";

const statuses = ["new", "contacted", "in_progress", "converted", "closed"] as const;

export function LeadsTable({ leads }: { leads: Record<string, unknown>[] }) {
  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <LeadRow key={String(lead.id)} lead={lead} />
      ))}
    </div>
  );
}

function LeadRow({ lead }: { lead: Record<string, unknown> }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const status = String(lead.status ?? "new");

  function onStatusChange(value: string) {
    startTransition(async () => {
      await updateRecord("contact_submissions", String(lead.id), { status: value });
      router.refresh();
    });
  }

  function onDelete() {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteRecord("contact_submissions", String(lead.id));
      router.refresh();
    });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{String(lead.name)}</h3>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
              {status}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <a href={`mailto:${String(lead.email)}`} className="inline-flex items-center gap-1 hover:text-primary">
              <Mail className="h-3.5 w-3.5" />
              {String(lead.email)}
            </a>
            {lead.phone ? <span>{String(lead.phone)}</span> : null}
            {lead.company ? <span>{String(lead.company)}</span> : null}
            {lead.service ? <span>Interested: {String(lead.service)}</span> : null}
            {lead.budget ? <span>Budget: {String(lead.budget)}</span> : null}
            <span>{formatDate(String(lead.created_at))}</span>
          </div>
          {lead.message ? (
            <p className="mt-2 rounded-lg bg-muted/50 p-3 text-sm leading-relaxed">{String(lead.message)}</p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Select value={status} onValueChange={onStatusChange} disabled={pending}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={onDelete} disabled={pending} title="Delete">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
