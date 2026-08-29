import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { makeSlug } from "@/lib/slug";
import { PROMO_PRICE, ENGRAVED_PRICE, SHIPPING } from "@/lib/config";

export async function POST(req) {
  const body = await req.json();
  const {
    slug: clientSlug,
    petName, ownerName,
    phone1Country, phone1, phone2Country, phone2,
    notes, showPhone1, showPhone2, showNotes,
    street, city, municipality, postal, country,
    deliveryPhone, deliveryEmail, showAddressPublic,
    tagType, pageMode, attachmentType, showNameOnTag,
  } = body;

  const isEngraved = tagType === "engraved";
  const price = isEngraved ? ENGRAVED_PRICE : PROMO_PRICE;
  const isRoaming = pageMode === "roaming";

  if (!petName?.trim() || !phone1?.trim()) {
    return NextResponse.json({ error: "Nedostaje ime ljubimca ili telefon" }, { status: 400 });
  }
  if (!street?.trim() || !city?.trim() || !postal?.trim() || !deliveryPhone?.trim()) {
    return NextResponse.json({ error: "Nedostaju podaci potrebni kuriru" }, { status: 400 });
  }

  const db = supabaseAdmin();

  // Koristimo slug koji je klijent već pokazao korisniku kao QR pregled,
  // tako da je fizički odštampan kod uvek tačno onaj koji radi.
  // Ako se (retko) poklopi sa postojećim, probamo par puta sa novim.
  let slug = clientSlug || makeSlug();
  let pet, petErr;
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await db
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
        page_mode: isRoaming ? "roaming" : "contact",
      })
      .select()
      .single();
    pet = res.data;
    petErr = res.error;
    if (!petErr) break;
    if (petErr.code === "23505") { // duplikat sluga — pokušaj sa novim
      slug = makeSlug();
      continue;
    }
    break;
  }
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

  const { error: orderErr } = await db.from("orders").insert({
    pet_id: pet.id,
    tag_type: isEngraved ? "engraved" : "standard",
    price,
    shipping: SHIPPING,
    attachment_type: attachmentType === "strap" ? "strap" : "ring",
    show_name_on_tag: showNameOnTag !== false,
  });
  if (orderErr) return NextResponse.json({ error: orderErr.message }, { status: 500 });

  return NextResponse.json({ slug });
}
