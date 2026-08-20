import { NextResponse } from "next/server";
import { supabaseAdmin, isAdminEmail } from "@/lib/supabase-admin";
import { supabaseServer } from "@/lib/supabase-server";

const ALLOWED_STATUSES = ["Nova", "Odštampano", "Poslato", "Naplaćeno"];

export async function POST(req, { params }) {
  // Samo prijavljeni admin sme da menja status narudžbine.
  // Middleware štiti samo /admin/*, ne i /api/*, pa ovde proveravamo ručno.
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Nije dozvoljeno" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (!ALLOWED_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Nepoznat status" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { error } = await db.from("orders").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
