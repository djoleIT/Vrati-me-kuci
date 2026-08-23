import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req, { params }) {
  const { id } = await params;
  const { status } = await req.json();
  const db = supabaseAdmin();
  const { error } = await db.from("orders").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
