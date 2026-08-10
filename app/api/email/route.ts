import { NextResponse } from "next/server";
import { sendContactEmail, isEmailJsConfigured } from "@/lib/emailjs/send";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isEmailJsConfigured()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const result = await sendContactEmail({
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    phone: (body.phone as string | null) ?? null,
    company: (body.company as string | null) ?? null,
    service: (body.service as string | null) ?? null,
    budget: (body.budget as string | null) ?? null,
    message: (body.message as string | null) ?? null,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
