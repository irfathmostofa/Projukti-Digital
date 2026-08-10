import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/utils";
import type { AdminProfile } from "@/types";

export async function getSession() {
  if (!isConfigured()) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getAdminProfile(userId: string): Promise<AdminProfile | null> {
  if (!isConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return data as AdminProfile;
}

export async function requireAdmin() {
  const user = await getSession();
  if (!user) redirect("/admin/login");
  const profile = await getAdminProfile(user.id);
  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/admin/login");
  }
  return { user, profile };
}
