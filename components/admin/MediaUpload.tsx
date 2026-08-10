"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { createRecord } from "@/lib/admin/actions";

const BUCKETS = [
  { value: "website-assets", label: "Website Assets" },
  { value: "product-images", label: "Product Images" },
  { value: "service-images", label: "Service Images" },
  { value: "testimonial-images", label: "Testimonial Images" },
  { value: "team-images", label: "Team Images" },
];

export function MediaUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [bucket, setBucket] = useState("website-assets");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setCopied(false);
    setUploading(true);
    try {
      const supabase = createClient();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
      const path = `${Date.now()}-${safeName}`;
      const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw new Error(upErr.message);

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      const url = data.publicUrl;

      await createRecord("media_assets", {
        name: file.name,
        url,
        bucket,
        size: file.size,
        mime_type: file.type || null,
      });

      navigator.clipboard?.writeText(url).catch(() => {});
      setCopied(true);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed. Check that you are signed in with an admin account."
      );
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="mb-6 rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-medium">Upload Asset</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Files are stored in Supabase Storage and registered in the media library.
      </p>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1.5">
          <label htmlFor="media-bucket" className="text-xs font-medium text-muted-foreground">
            Bucket
          </label>
          <select
            id="media-bucket"
            value={bucket}
            onChange={(e) => setBucket(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {BUCKETS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="button"
          variant="outline"
          className="sm:h-9"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Choose File"}
        </Button>
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onUpload}
        />
      </div>
      {copied ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-500">
          <Check className="h-3.5 w-3.5" /> Uploaded — URL copied to clipboard.
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
