import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const ADMIN_REVALIDATE_SECRET = process.env.REVALIDATE_SECRET;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const secret = body.secret as string | undefined;

  if (!ADMIN_REVALIDATE_SECRET || secret !== ADMIN_REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid secret." }, { status: 401 });
  }

  const path = (body.path as string) || "/";
  try {
    revalidatePath(path);
    return NextResponse.json({ ok: true, revalidated: path });
  } catch (err) {
    console.error("[api/revalidate]", err);
    return NextResponse.json({ ok: false, error: "Revalidation failed." }, { status: 500 });
  }
}
