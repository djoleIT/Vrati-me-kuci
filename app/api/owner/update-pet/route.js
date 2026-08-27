import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req) {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Nisi prijavljen" }, { status: 401 });

  const body = await req.json();
  const { petId, petName, phone1Country, phone1, phone2Country, phone2, notes, showPhone1, showPhone2, showNotes, pageMode } = body;

  if (!petId) return NextResponse.json({ error: "Nedostaje ID profila" }, { status: 400 });

  const db = supabaseAdmin();

  // Provera vlasništva — sme da menja SAMO svoj profil
  const { data: pet } = await db.from("pets").select("owner_user_id").eq("id", petId).single();
  if (!pet || pet.owner_user_id !== user.id) {
    return NextResponse.json({ error: "Nemaš pristup ovom profilu" }, { status: 403 });
  }

  const { error } = await db
    .from("pets")
    .update({
      pet_name: petName?.trim(),
      phone1_country: phone1Country || "+381",
      phone1: phone1?.trim(),
      phone2_country: phone2Country || "+381",
      phone2: phone2?.trim() || null,
      notes: notes?.trim() || null,
      show_phone1: !!showPhone1,
      show_phone2: !!showPhone2,
      show_notes: !!showNotes,
      page_mode: pageMode === "roaming" ? "roaming" : "contact",
    })
    .eq("id", petId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
