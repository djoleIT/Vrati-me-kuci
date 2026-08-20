import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { SITE, isValidSlug, makeSlug } from "@/lib/site";
import {
  digitsOnly,
  emailOnly,
  isEmail,
  lettersOnly,
  notesOnly,
  streetOnly,
} from "@/lib/filters";

async function uniqueSlug(db, preferred) {
  const candidates = [];
  if (isValidSlug(preferred)) candidates.push(preferred);
  for (let i = 0; i < 5; i++) candidates.push(makeSlug());

  for (const slug of candidates) {
    const { data } = await db.from("pets").select("id").eq("slug", slug).maybeSingle();
    if (!data) return slug;
  }
  return makeSlug(12);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev" }, { status: 400 });
  }

  const petName = lettersOnly(body.petName);
  const ownerName = lettersOnly(body.ownerName);
  const phone1 = digitsOnly(body.phone1, 15);
  const phone2 = digitsOnly(body.phone2, 15);
  const notes = notesOnly(body.notes);
  const street = streetOnly(body.street);
  const city = lettersOnly(body.city, 60);
  const municipality = lettersOnly(body.municipality, 60);
  const postal = digitsOnly(body.postal, 10);
  const country = lettersOnly(body.country, 60) || "Srbija";
  const deliveryPhone = digitsOnly(body.deliveryPhone, 15);
  const deliveryEmail = emailOnly(body.deliveryEmail);
  const phone1Country = String(body.phone1Country || "+381").slice(0, 6);
  const phone2Country = String(body.phone2Country || "+381").slice(0, 6);

  if (!petName.trim() || !phone1) {
    return NextResponse.json({ error: "Nedostaje ime ljubimca ili telefon" }, { status: 400 });
  }
  if (!street.trim() || !city.trim() || postal.length < 4 || !deliveryPhone) {
    return NextResponse.json({ error: "Nedostaju podaci potrebni kuriru" }, { status: 400 });
  }
  if (!isEmail(deliveryEmail)) {
    return NextResponse.json({ error: "Email nije ispravan" }, { status: 400 });
  }

  const db = supabaseAdmin();
  const slug = await uniqueSlug(db, body.slug);

  const { data: pet, error: petErr } = await db
    .from("pets")
    .insert({
      slug,
      pet_name: petName.trim(),
      owner_name: ownerName.trim() || null,
      phone1_country: phone1Country,
      phone1,
      phone2_country: phone2Country,
      phone2: phone2 || null,
      notes: notes.trim() || null,
      show_phone1: body.showPhone1 !== false,
      show_phone2: !!body.showPhone2,
      show_notes: body.showNotes !== false,
    })
    .select()
    .single();

  if (petErr) return NextResponse.json({ error: petErr.message }, { status: 500 });

  const { error: addrErr } = await db.from("owner_addresses").insert({
    pet_id: pet.id,
    street: street.trim(),
    city: city.trim(),
    municipality: municipality.trim() || null,
    postal_code: postal,
    country,
    contact_phone: deliveryPhone,
    contact_email: deliveryEmail || null,
    show_address_public: !!body.showAddressPublic,
  });

  if (addrErr) {
    await db.from("pets").delete().eq("id", pet.id);
    return NextResponse.json({ error: addrErr.message }, { status: 500 });
  }

  const { error: orderErr } = await db.from("orders").insert({
    pet_id: pet.id,
    price: SITE.pricePromo,
    shipping: SITE.shipping,
  });

  if (orderErr) {
    await db.from("owner_addresses").delete().eq("pet_id", pet.id);
    await db.from("pets").delete().eq("id", pet.id);
    return NextResponse.json({ error: orderErr.message }, { status: 500 });
  }

  return NextResponse.json({ slug });
}
