"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateSiteSettings } from "@/lib/admin/actions";

export interface SettingsField {
  name: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  help?: string;
  required?: boolean;
  textareaRows?: number;
}

interface SettingsFormProps {
  fields: SettingsField[];
  initial?: Record<string, unknown> | null;
  submitLabel?: string;
}

export function SettingsForm({ fields, initial, submitLabel = "Save Changes" }: SettingsFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const v: Record<string, string> = {};
    for (const f of fields) {
      const val = initial?.[f.name];
      v[f.name] = val == null ? "" : String(val);
    }
    return v;
  });

  function setValue(name: string, value: string) {
    setSaved(false);
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const payload: Record<string, unknown> = {};
    for (const f of fields) {
      const v = values[f.name].trim();
      payload[f.name] = v === "" ? null : v;
    }

    startTransition(async () => {
      try {
        await updateSiteSettings(payload as never);
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save settings.");
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
      {saved ? (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-500">
          Settings saved successfully.
        </div>
      ) : null}

      {fields.map((f) => (
        <div key={f.name} className="space-y-2">
          <Label htmlFor={f.name}>{f.label}{f.required ? " *" : ""}</Label>
          {f.type === "textarea" ? (
            <Textarea
              id={f.name}
              rows={f.textareaRows ?? 4}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={(e) => setValue(f.name, e.target.value)}
            />
          ) : (
            <Input
              id={f.name}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={(e) => setValue(f.name, e.target.value)}
            />
          )}
          {f.help ? <p className="text-xs text-muted-foreground">{f.help}</p> : null}
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
