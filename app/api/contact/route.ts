import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isConfigured } from "@/lib/utils";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" && body.phone ? body.phone.trim() : null;
  const company = typeof body.company === "string" && body.company ? body.company.trim() : null;
  const service = typeof body.service === "string" && body.service ? body.service.trim() : null;
  const budget = typeof body.budget === "string" && body.budget ? body.budget.trim() : null;
  const message = typeof body.message === "string" && body.message ? body.message.trim() : null;

  if (!name || name.length < 2) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email is required." }, { status: 400 });
  }

  if (!isConfigured()) {
    // Demo mode: acknowledge without persisting
    return NextResponse.json({ ok: true, demo: true });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone,
    company,
    service,
    budget,
    message,
    status: "new",
  });

  if (error) {
    console.error("[api/contact] insert failed:", error.message);
    return NextResponse.json({ ok: false, error: "Failed to save submission." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
