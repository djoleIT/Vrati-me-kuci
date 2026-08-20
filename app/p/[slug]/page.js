import { supabaseAdmin } from "@/lib/supabase-admin";
import SiteHeader from "@/components/SiteHeader";

export const metadata = { robots: { index: false, follow: false } };

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const db = supabaseAdmin();
  const { data: pet } = await db.from("pets").select("pet_name").eq("slug", slug).maybeSingle();
  if (!pet) return { title: "Profil nije pronađen — Vrati Me Kući" };
  return {
    title: `${pet.pet_name} — Vrati Me Kući`,
    description: "Ovaj ljubimac je pronađen. Pozovi vlasnika.",
    robots: { index: false, follow: false },
  };
}

export default async function PetPage({ params }) {
  const { slug } = await params;
  const db = supabaseAdmin();

  const { data: pet } = await db.from("pets").select("*").eq("slug", slug).maybeSingle();

  if (!pet) {
    return (
      <div>
        <SiteHeader compact />
        <div className="panel" style={{ marginTop: 60, textAlign: "center" }}>
          <p>Ovaj profil ne postoji ili još nije aktiviran.</p>
          <p className="muted">Ako ste upravo poručili privezak, osvežite stranicu za koji trenutak.</p>
        </div>
      </div>
    );
  }

  const { data: address } = await db
    .from("owner_addresses")
    .select("city, municipality, country, show_address_public")
    .eq("pet_id", pet.id)
    .maybeSingle();

  const phone1 = `${pet.phone1_country || ""}${pet.phone1 || ""}`.replace(/\s/g, "");
  const phone2 = pet.phone2 ? `${pet.phone2_country || ""}${pet.phone2}`.replace(/\s/g, "") : "";

  return (
    <div>
      <SiteHeader compact />
      <div style={{ display: "flex", justifyContent: "center", padding: "48px 20px" }}>
        <div className="phone" style={{ width: 300 }}>
          <div className="phonescreen">
            <div className="pplabel">Ovaj ljubimac je pronađen</div>
            <div className="ppname">{pet.pet_name}</div>
            {pet.owner_name && (
              <p style={{ textAlign: "center", margin: "0 0 14px", fontSize: 14, color: "#444" }}>
                Vlasnik: {pet.owner_name}
              </p>
            )}

            {pet.show_phone1 && phone1 && (
              <a className="callbtn" href={`tel:${phone1}`}>
                Pozovi {pet.owner_name || "vlasnika"}
              </a>
            )}
            {pet.show_phone2 && phone2 && (
              <a className="callbtn" style={{ background: "var(--teal)" }} href={`tel:${phone2}`}>
                Pozovi (dodatni broj)
              </a>
            )}
            {pet.show_notes && pet.notes && <div className="infoline">⚠ {pet.notes}</div>}
            {address?.show_address_public && (
              <div className="infoline">
                📍 {address.city}
                {address.municipality ? `, ${address.municipality}` : ""}, {address.country}
              </div>
            )}
            {!pet.show_phone1 && !pet.show_phone2 && (
              <p style={{ fontSize: 13, color: "#666", textAlign: "center" }}>
                Vlasnik nije ostavio javni kontakt.
              </p>
            )}
            <p style={{ fontSize: 11, color: "#888", textAlign: "center", marginTop: 18 }}>
              Vrati Me Kući · skenirani QR privezak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
