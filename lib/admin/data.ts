import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/utils";

async function client() {
  if (!isConfigured()) return null;
  return createClient();
}

export async function getCounts() {
  const supabase = await client();
  if (!supabase) return null;

  const tables = [
    "products",
    "services",
    "faqs",
    "testimonials",
    "team_members",
    "contact_submissions",
    "media_assets",
  ] as const;

  const counts: Record<string, number> = {};
  await Promise.all(
    tables.map(async (t) => {
      const { count, error } = await supabase.from(t).select("*", { count: "exact", head: true });
      counts[t] = error ? 0 : (count ?? 0);
    })
  );

  const { count: activeProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);
  const { count: newLeads } = await supabase
    .from("contact_submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");
  const { data: latestLeads } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    counts,
    activeProducts: activeProducts ?? 0,
    newLeads: newLeads ?? 0,
    latestLeads: (latestLeads ?? []) as {
      id: string;
      name: string;
      email: string;
      service: string | null;
      status: string;
      created_at: string;
    }[],
  };
}

export async function getRecentActivity() {
  const supabase = await client();
  if (!supabase) return [];

  const { data } = await supabase
    .from("contact_submissions")
    .select("id, name, email, created_at, status")
    .order("created_at", { ascending: false })
    .limit(10);

  return (data ?? []) as {
    id: string;
    name: string;
    email: string;
    created_at: string;
    status: string;
  }[];
}

export async function listRecords(
  table: string,
  opts: { search?: string; searchField?: string; limit?: number; orderBy?: string } = {}
): Promise<Record<string, unknown>[]> {
  const supabase = await client();
  if (!supabase) return [];

  const limit = opts.limit ?? 100;
  let query = supabase.from(table).select("*").limit(limit);

  if (opts.orderBy) {
    query = query.order(opts.orderBy, { ascending: false });
  }

  if (opts.search && opts.searchField) {
    query = query.ilike(opts.searchField, `%${opts.search}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error(`[admin] ${table}:`, error.message);
    return [];
  }
  return (data ?? []) as Record<string, unknown>[];
}

export async function getRecord(table: string, id: string): Promise<Record<string, unknown> | null> {
  const supabase = await client();
  if (!supabase) return null;
  const { data, error } = await supabase.from(table).select("*").eq("id", id).maybeSingle();
  if (error) return null;
  return (data ?? null) as Record<string, unknown> | null;
}
