"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateHomepageSection } from "@/lib/admin/actions";
import type { HomepageSection } from "@/types";

type Cta = { label?: string; url?: string };
type Stat = { number: number; suffix?: string; label: string };
type Step = { title: string; description: string };

interface SectionContent {
  badge?: string;
  heroImage?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  statistics?: Stat[];
  points?: string[];
  steps?: Step[];
}

function CtaEditor({
  value,
  onChange,
}: {
  value: Cta;
  onChange: (v: Cta) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-2">
        <Label>Label</Label>
        <Input
          value={value.label ?? ""}
          placeholder="Button label"
          onChange={(e) => onChange({ ...value, label: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>URL</Label>
        <Input
          value={value.url ?? ""}
          placeholder="/contact"
          onChange={(e) => onChange({ ...value, url: e.target.value })}
        />
      </div>
    </div>
  );
}

function StatsEditor({
  value,
  onChange,
}: {
  value: Stat[];
  onChange: (v: Stat[]) => void;
}) {
  function update(idx: number, patch: Partial<Stat>) {
    const next = [...value];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }
  return (
    <div className="space-y-3">
      {value.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-wrap items-end gap-2 rounded-lg border border-border p-3"
        >
          <div className="space-y-2">
            <Label className="text-xs">Number</Label>
            <Input
              type="number"
              className="w-28"
              value={String(stat.number ?? 0)}
              onChange={(e) =>
                update(idx, { number: Number(e.target.value) || 0 })
              }
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Suffix</Label>
            <Input
              className="w-20"
              value={stat.suffix ?? ""}
              placeholder="+"
              onChange={(e) => update(idx, { suffix: e.target.value })}
            />
          </div>
          <div className="min-w-40 flex-1 space-y-2">
            <Label className="text-xs">Label</Label>
            <Input
              value={stat.label ?? ""}
              placeholder="Projects Delivered"
              onChange={(e) => update(idx, { label: e.target.value })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Remove statistic"
            onClick={() => onChange(value.filter((_, i) => i !== idx))}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() =>
          onChange([...value, { number: 0, suffix: "+", label: "" }])
        }
      >
        <Plus className="mr-1 h-3 w-3" /> Add statistic
      </Button>
    </div>
  );
}

function StepsEditor({
  value,
  onChange,
}: {
  value: Step[];
  onChange: (v: Step[]) => void;
}) {
  function update(idx: number, patch: Partial<Step>) {
    const next = [...value];
    next[idx] = { ...next[idx], ...patch };
    onChange(next);
  }
  return (
    <div className="space-y-3">
      {value.map((step, idx) => (
        <div
          key={idx}
          className="space-y-2 rounded-lg border border-border p-3"
        >
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">
              Step {idx + 1}
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Remove step"
              onClick={() => onChange(value.filter((_, i) => i !== idx))}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Input
              className="sm:col-span-1"
              value={step.title ?? ""}
              placeholder="Discovery"
              onChange={(e) => update(idx, { title: e.target.value })}
            />
            <Input
              className="sm:col-span-2"
              value={step.description ?? ""}
              placeholder="We map your goals and requirements."
              onChange={(e) => update(idx, { description: e.target.value })}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, { title: "", description: "" }])}
      >
        <Plus className="mr-1 h-3 w-3" /> Add step
      </Button>
    </div>
  );
}

function PointsEditor({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="space-y-3">
      {value.map((point, idx) => (
        <div key={idx} className="flex gap-2">
          <Input
            value={point ?? ""}
            placeholder="Senior engineers only"
            onChange={(e) => {
              const next = [...value];
              next[idx] = e.target.value;
              onChange(next);
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            title="Remove point"
            onClick={() => onChange(value.filter((_, i) => i !== idx))}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...value, ""])}
      >
        <Plus className="mr-1 h-3 w-3" /> Add point
      </Button>
    </div>
  );
}

function SectionEditor({
  content,
  keys,
  onChange,
}: {
  content: SectionContent;
  keys: string[];
  onChange: (c: SectionContent) => void;
}) {
  const has = (k: string) => keys.includes(k);
  return (
    <div className="space-y-6">
      {has("badge") && (
        <div className="space-y-2">
          <Label>Badge</Label>
          <Input
            value={content.badge ?? ""}
            placeholder="Trusted by 30+ growing companies"
            onChange={(e) => onChange({ ...content, badge: e.target.value })}
          />
        </div>
      )}
      {has("heroImage") && (
        <div className="space-y-2">
          <Label>Hero Image URL</Label>
          <Input
            value={content.heroImage ?? ""}
            placeholder="https://... or /media/..."
            onChange={(e) =>
              onChange({ ...content, heroImage: e.target.value })
            }
          />
          {content.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={content.heroImage}
              alt="Hero preview"
              className="mt-2 h-36 w-full rounded-lg border border-border object-cover"
            />
          ) : null}
        </div>
      )}
      {has("primaryCta") && (
        <div className="space-y-2">
          <Label>Primary CTA</Label>
          <CtaEditor
            value={content.primaryCta ?? {}}
            onChange={(v) => onChange({ ...content, primaryCta: v })}
          />
        </div>
      )}
      {has("secondaryCta") && (
        <div className="space-y-2">
          <Label>Secondary CTA</Label>
          <CtaEditor
            value={content.secondaryCta ?? {}}
            onChange={(v) => onChange({ ...content, secondaryCta: v })}
          />
        </div>
      )}
      {has("statistics") && (
        <div className="space-y-2">
          <Label>Statistics</Label>
          <StatsEditor
            value={content.statistics ?? []}
            onChange={(v) => onChange({ ...content, statistics: v })}
          />
        </div>
      )}
      {has("points") && (
        <div className="space-y-2">
          <Label>Points</Label>
          <PointsEditor
            value={content.points ?? []}
            onChange={(v) => onChange({ ...content, points: v })}
          />
        </div>
      )}
      {has("steps") && (
        <div className="space-y-2">
          <Label>Process Steps</Label>
          <StepsEditor
            value={content.steps ?? []}
            onChange={(v) => onChange({ ...content, steps: v })}
          />
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  name,
}: {
  section: HomepageSection;
  name: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [enabled, setEnabled] = useState(section.is_enabled);
  const [title, setTitle] = useState(section.title ?? "");
  const [subtitle, setSubtitle] = useState(section.subtitle ?? "");
  const [content, setContent] = useState<SectionContent>(() => {
    const raw = section.content;
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      return raw as SectionContent;
    }
    return {};
  });

  const contentKeys =
    section.key === "hero"
      ? ["badge", "heroImage", "primaryCta", "secondaryCta", "statistics"]
      : section.key === "why_choose_us"
        ? ["points"]
        : section.key === "process"
          ? ["steps"]
          : section.key === "cta"
            ? ["primaryCta", "secondaryCta"]
            : [];

  function buildContent(): Record<string, unknown> | null {
    const entries: Record<string, unknown> = {};
    for (const key of contentKeys) {
      const v = (content as Record<string, unknown>)[key];
      if (key === "primaryCta" || key === "secondaryCta") {
        const cta = v as Cta | undefined;
        if (cta?.label?.trim() || cta?.url?.trim()) {
          entries[key] = {
            label: cta.label?.trim() || null,
            url: cta.url?.trim() || null,
          };
        } else {
          entries[key] = null;
        }
      } else if (key === "statistics") {
        const stats = Array.isArray(v)
          ? (v as Stat[]).filter((s) => s.label?.trim())
          : [];
        entries[key] = stats.length ? stats : null;
      } else if (key === "points") {
        const points = Array.isArray(v)
          ? (v as string[]).filter((p) => p.trim())
          : [];
        entries[key] = points.length ? points : null;
      } else if (key === "steps") {
        const steps = Array.isArray(v)
          ? (v as Step[]).filter((s) => s.title?.trim())
          : [];
        entries[key] = steps.length ? steps : null;
      } else {
        const str = typeof v === "string" ? v.trim() : "";
        entries[key] = str || null;
      }
    }
    return Object.values(entries).some((v) => v !== null && v !== undefined)
      ? entries
      : null;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        await updateHomepageSection(section.id, {
          title: title.trim() || null,
          subtitle: subtitle.trim() || null,
          is_enabled: enabled,
          content: buildContent(),
        });
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to save section.",
        );
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold capitalize">{name}</h2>
          <p className="text-xs text-muted-foreground">key: {section.key}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              checked={enabled}
              onCheckedChange={(v) => {
                setEnabled(v);
                setSaved(false);
              }}
              title="Enable / disable section"
            />
            <Label className="text-sm">
              {enabled ? "Enabled" : "Disabled"}
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        {error ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}
        {saved ? (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-500">
            Section saved successfully.
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor={`${section.key}-title`}>Title</Label>
          <Input
            id={`${section.key}-title`}
            value={title}
            placeholder={name}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaved(false);
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${section.key}-subtitle`}>
            Subtitle / Description
          </Label>
          <Textarea
            id={`${section.key}-subtitle`}
            rows={2}
            value={subtitle}
            onChange={(e) => {
              setSubtitle(e.target.value);
              setSaved(false);
            }}
          />
        </div>

        {contentKeys.length > 0 ? (
          <div className="space-y-2">
            <Label>Section Content</Label>
            <SectionEditor
              content={content}
              keys={contentKeys}
              onChange={(c) => {
                setContent(c);
                setSaved(false);
              }}
            />
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            This section has no extra content fields. Title and subtitle are
            used.
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={pending}>
            {pending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {pending ? "Saving..." : "Save Section"}
          </Button>
        </div>
      </div>
    </form>
  );
}

const SECTION_NAMES: Record<string, string> = {
  hero: "Hero",
  statistics: "Statistics",
  featured_products: "Featured Products",
  services: "Services",
  why_choose_us: "Why Choose Us",
  process: "Process",
  testimonials: "Testimonials",
  cta: "Call to Action",
};

export function HomepageSectionsForm({
  sections,
}: {
  sections: HomepageSection[];
}) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          name={SECTION_NAMES[section.key] ?? section.key}
        />
      ))}
    </div>
  );
}
