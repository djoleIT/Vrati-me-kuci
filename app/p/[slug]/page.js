import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata = { robots: { index: false, follow: false } };

export default async function PetPage({ params }) {
  const { slug } = await params;
  const db = supabaseAdmin();

  const { data: pet } = await db.from("pets").select("*").eq("slug", slug).single();
  const { data: address } = await db
    .from("owner_addresses")
    .select("city, municipality, country, show_address_public")
    .eq("pet_id", pet?.id)
    .maybeSingle();

  if (!pet) {
    return (
      <div className="panel" style={{ marginTop: 60, textAlign: "center" }}>
        <p>Ovaj profil ne postoji.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="nav">
        <a className="brand" href="/"><span className="dot" /> Vrati Me Kući</a>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
        <div className="phone" style={{ width: 280 }}>
          <div className="phonescreen">
            <div className="pplabel">Ovaj ljubimac je pronađen</div>
            <div className="ppname">{pet.pet_name}</div>

            {pet.show_phone1 && (
              <a className="callbtn" href={`tel:${pet.phone1_country}${pet.phone1}`}>
                📞 Pozovi {pet.owner_name || "vlasnika"}
              </a>
            )}
            {pet.show_phone2 && pet.phone2 && (
              <a className="callbtn" style={{ background: "var(--teal)" }} href={`tel:${pet.phone2_country}${pet.phone2}`}>
                📞 Pozovi (dodatni broj)
              </a>
            )}
            {pet.show_notes && pet.notes && (
              <div className="infoline">⚠ {pet.notes}</div>
            )}
            {address?.show_address_public && (
              <div className="infoline">📍 {address.city}{address.municipality ? `, ${address.municipality}` : ""}, {address.country}</div>
            )}
            {!pet.show_phone1 && !pet.show_phone2 && (
              <p style={{ fontSize: 13, color: "#666", textAlign: "center" }}>
                Vlasnik nije ostavio javni kontakt.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
