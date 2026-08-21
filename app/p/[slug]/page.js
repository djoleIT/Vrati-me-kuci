import { supabaseAdmin } from "@/lib/supabase-admin";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const db = supabaseAdmin();
  const { data: pet } = await db.from("pets").select("pet_name").eq("slug", slug).maybeSingle();
  return {
    title: pet ? `${pet.pet_name} — Vrati Me Kući` : "Vrati Me Kući",
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

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

  const isRoaming = pet.page_mode === "roaming";

  return (
    <div>
      <div className="nav">
        <a className="brand" href="/"><span className="dot" /> Vrati Me Kući</a>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
        <div className="phone" style={{ width: 280 }}>
          <div className="phonescreen">
            {isRoaming ? (
              <>
                <div className="pplabel">🐾</div>
                <div className="ppname">Sve je u redu</div>
                <p style={{ fontSize: 13, color: "#444", textAlign: "center", lineHeight: 1.6, padding: "0 6px" }}>
                  <strong>{pet.pet_name}</strong> je slobodan i nije izgubljen. Ovo je normalno —
                  nema potrebe za brigom niti pozivom.
                </p>
                {pet.show_phone1 && (
                  <a className="callbtn" href={`tel:${pet.phone1_country}${pet.phone1}`}
                     style={{ background: "var(--teal)", opacity: 0.85, fontSize: 12, marginTop: 14 }}>
                    Ipak nešto nije u redu? Pozovi
                  </a>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
