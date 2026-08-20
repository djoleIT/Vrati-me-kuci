import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { notesOnly } from "@/lib/filters";

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

  const db = supabaseAdmin();
  const { error } = await db
    .from("orders")
    .update({ admin_note: notesOnly(body.note, 500) || null })
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
