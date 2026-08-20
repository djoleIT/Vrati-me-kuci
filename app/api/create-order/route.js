import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function makeSlug() {
  return Math.random().toString(36).slice(2, 8);
}

export async function POST(req) {
  const body = await req.json();
  const {
    petName, ownerName,
    phone1Country, phone1, phone2Country, phone2,
    notes, showPhone1, showPhone2, showNotes,
    street, city, municipality, postal, country,
    deliveryPhone, deliveryEmail, showAddressPublic,
  } = body;

  if (!petName?.trim() || !phone1?.trim()) {
    return NextResponse.json({ error: "Nedostaje ime ljubimca ili telefon" }, { status: 400 });
  }
  if (!street?.trim() || !city?.trim() || !postal?.trim() || !deliveryPhone?.trim()) {
    return NextResponse.json({ error: "Nedostaju podaci potrebni kuriru" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const slug = makeSlug();

  const { data: pet, error: petErr } = await db
    .from("pets")
    .insert({
      slug,
      pet_name: petName.trim(),
      owner_name: ownerName?.trim() || null,
      phone1_country: phone1Country || "+381",
      phone1: phone1.trim(),
      phone2_country: phone2Country || "+381",
      phone2: phone2?.trim() || null,
      notes: notes?.trim() || null,
      show_phone1: !!showPhone1,
      show_phone2: !!showPhone2,
      show_notes: !!showNotes,
    })
    .select()
    .single();

  if (petErr) return NextResponse.json({ error: petErr.message }, { status: 500 });

  const { error: addrErr } = await db.from("owner_addresses").insert({
    pet_id: pet.id,
    street: street.trim(),
    city: city.trim(),
    municipality: municipality?.trim() || null,
    postal_code: postal.trim(),
    country: country?.trim() || "Srbija",
    contact_phone: deliveryPhone.trim(),
    contact_email: deliveryEmail?.trim() || null,
    show_address_public: !!showAddressPublic,
  });
  if (addrErr) return NextResponse.json({ error: addrErr.message }, { status: 500 });

  const { error: orderErr } = await db.from("orders").insert({ pet_id: pet.id });
  if (orderErr) return NextResponse.json({ error: orderErr.message }, { status: 500 });

  return NextResponse.json({ slug });
}
