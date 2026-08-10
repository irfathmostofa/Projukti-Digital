"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/session";
import { createClient } from "@/lib/supabase/server";
import { isConfigured, slugify } from "@/lib/utils";
import { redirect } from "next/navigation";

type JsonValue = string | number | boolean | null | string[] | Record<string, unknown> | unknown[];

export async function createRecord(table: string, values: Record<string, JsonValue>) {
  await requireAdmin();
  if (!isConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(values);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateRecord(table: string, id: string, values: Record<string, JsonValue>) {
  await requireAdmin();
  if (!isConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from(table).update(values).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteRecord(table: string, id: string) {
  await requireAdmin();
  if (!isConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function toggleStatus(table: string, id: string, field: string, value: boolean) {
  await requireAdmin();
  if (!isConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from(table).update({ [field]: value }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function signOutAction() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function generateSlug(name: string) {
  return slugify(name);
}

export async function updateSiteSettings(values: Record<string, JsonValue>) {
  await requireAdmin();
  if (!isConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("id").limit(1).maybeSingle();
  const { error } = data
    ? await supabase.from("site_settings").update(values).eq("id", data.id)
    : await supabase.from("site_settings").insert({ ...values, id: crypto.randomUUID() });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateHomepageSections(sections: {
  id: string;
  is_enabled: boolean;
  title: string | null;
  subtitle: string | null;
  content: unknown;
}[]) {
  await requireAdmin();
  if (!isConfigured()) {
    throw new Error("Supabase is not configured.");
  }
  const supabase = await createClient();
  for (const section of sections) {
    const { error } = await supabase.from("homepage_sections").update({
      is_enabled: section.is_enabled,
      title: section.title,
      subtitle: section.subtitle,
      content: section.content,
    }).eq("id", section.id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/", "layout");
  return { ok: true };
}
