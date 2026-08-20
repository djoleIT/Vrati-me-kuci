import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { ORDER_STATUSES } from "@/lib/site";

export async function POST(req, { params }) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { id } = await params;
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev" }, { status: 400 });
  }

  const status = body.status;
  if (!ORDER_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Nepoznat status" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from("orders").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
