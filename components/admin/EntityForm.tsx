"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRecord, updateRecord, generateSlug } from "@/lib/admin/actions";
import { cn } from "@/lib/utils";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "select"
  | "slug"
  | "list"
  | "json-list";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  textareaRows?: number;
  help?: string;
}

type FormValues = Record<string, string | number | boolean | string[] | null>;

interface EntityFormProps {
  table: string;
  fields: FieldDef[];
  initial?: FormValues | null;
  redirectPath: string;
  submitLabel?: string;
}

function ItemType({ items, onChange }: { items: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-2">
          <Input value={item} onChange={(e) => {
            const next = [...items];
            next[idx] = e.target.value;
            onChange(next);
          }} />
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange(items.filter((_, i) => i !== idx))}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, ""])}
      >
        <Plus className="mr-1 h-3 w-3" /> Add item
      </Button>
    </div>
  );
}

export function EntityForm({ table, fields, initial, redirectPath, submitLabel = "Save" }: EntityFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [values, setValues] = useState<FormValues>(() => {
    const v: FormValues = {};
    for (const f of fields) {
      const init = initial?.[f.name];
      if (f.type === "checkbox") {
        v[f.name] = Boolean(init);
      } else if (f.type === "select") {
        v[f.name] = init && init !== "none" ? String(init) : "none";
      } else if (f.type === "list" || f.type === "json-list") {
        v[f.name] = Array.isArray(init) ? init.map(String) : [];
      } else {
        v[f.name] = init ? String(init) : "";
      }
    }
    return v;
  });

  function setValue(name: string, value: string | number | boolean | string[]) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function onSlugFrom(name: string, slugName: string) {
    const val = await generateSlug(String(values[name] ?? ""));
    setValue(slugName, val);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const v = values[f.name];
      if (f.type === "checkbox") {
        payload[f.name] = Boolean(v);
      } else if (f.type === "number") {
        payload[f.name] = Number(v) || 0;
      } else if (f.type === "select") {
        payload[f.name] = v === "none" || v === "" ? null : String(v);
      } else if (f.type === "list" || f.type === "json-list") {
        const arr = Array.isArray(v) ? v : [];
        payload[f.name] = f.type === "json-list"
          ? arr.filter((s) => s.trim() !== "").map((s) => {
              try { return JSON.parse(s); } catch { return s; }
            })
          : arr.filter((s) => s.trim() !== "");
      } else if (f.required || String(v ?? "") !== "") {
        payload[f.name] = String(v ?? "").trim() === "" ? null : String(v ?? "").trim();
      } else {
        payload[f.name] = null;
      }
    }

    startTransition(async () => {
      try {
        if (initial?.id) {
          await updateRecord(table, String(initial.id), payload as never);
        } else {
          await createRecord(table, payload as never);
        }
        router.push(redirectPath);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save.");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-5 rounded-xl border border-border bg-card p-6">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {fields.map((f) => {
        const value = values[f.name] ?? "";
        if (f.type === "textarea") {
          return (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</Label>
              <Textarea
                id={f.name}
                rows={f.textareaRows ?? 4}
                placeholder={f.placeholder}
                value={String(value)}
                onChange={(e) => setValue(f.name, e.target.value)}
              />
            </div>
          );
        }
        if (f.type === "number") {
          return (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</Label>
              <Input
                id={f.name}
                type="number"
                placeholder={f.placeholder}
                value={String(value)}
                onChange={(e) => setValue(f.name, Number(e.target.value))}
              />
            </div>
          );
        }
        if (f.type === "checkbox") {
          return (
            <div key={f.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Checkbox
                id={f.name}
                checked={Boolean(value)}
                onCheckedChange={(v) => setValue(f.name, v === true)}
              />
              <Label htmlFor={f.name} className="font-medium">{f.label}</Label>
            </div>
          );
        }
        if (f.type === "select") {
          return (
            <div key={f.name} className="space-y-2">
              <Label htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</Label>
              <Select value={String(value)} onValueChange={(v) => setValue(f.name, v)}>
                <SelectTrigger id={f.name}>
                  <SelectValue placeholder={f.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {(f.options ?? []).map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
        if (f.type === "list" || f.type === "json-list") {
          return (
            <div key={f.name} className="space-y-2">
              <Label>{f.label}</Label>
              <ItemType items={Array.isArray(value) ? value : []} onChange={(v) => setValue(f.name, v)} />
              {f.help ? <p className="text-xs text-muted-foreground">{f.help}</p> : null}
            </div>
          );
        }
        if (f.type === "slug") {
          const source = fields.find((x) => x.name === "name")?.name ?? "name";
          return (
            <div key={f.name} className="space-y-2">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</Label>
                  <Input
                    id={f.name}
                    placeholder={f.placeholder ?? "auto-generated"}
                    value={String(value)}
                    onChange={(e) => setValue(f.name, e.target.value)}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9"
                  onClick={() => onSlugFrom(source, f.name)}
                >
                  Generate
                </Button>
              </div>
            </div>
          );
        }
        return (
          <div key={f.name} className="space-y-2">
            <Label htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</Label>
            <Input
              id={f.name}
              placeholder={f.placeholder}
              value={String(value)}
              onChange={(e) => setValue(f.name, e.target.value)}
              className={cn(f.name === "slug" && "font-mono text-xs")}
            />
          </div>
        );
      })}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {pending ? "Saving..." : submitLabel}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
