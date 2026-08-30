import { supabaseAdmin } from "@/lib/supabase-admin";
import ScanFooter from "@/components/ScanFooter";

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

  // Trajni demo primer — uvek postoji, bez obzira na bazu, tako da QR na
  // početnoj strani uvek stvarno radi i može se isprobati.
  if (slug === "demo") {
    return (
      <div>
        <div className="nav">
          <a className="brand" href="/"><img src="/logo.png" alt="Vrati Me Kući" className="brandlogo" /> Vrati Me Kući</a>
        </div>
        <div className="scanwrap">
          <div className="scancard">
            <div className="pplabel">Ovaj ljubimac je pronađen</div>
            <div className="ppname">Luna</div>
            <a className="callbtn" href="tel:+381601234567">📞 Pozovi Miloša</a>
            <div className="infoline">⚠ Alergična na pčele</div>
          </div>
          <p className="scanDemoNote">
            Ovo je demo primer — tačno ovako izgleda stranica kad neko skenira pravi privezak.
          </p>
          <a href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
            Napravi svoj profil →
          </a>
        </div>
        <ScanFooter />
      </div>
    );
  }

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

  // Evidentiraj skeniranje. Namerno se čeka (await) — u serverless okruženju
  // (Vercel) "fire and forget" upis bez čekanja zna povremeno da se izgubi
  // jer se funkcija ugasi čim se stranica pošalje. Upis je brz i ne dodaje
  // primetno kašnjenje, a garantuje da se svako skeniranje stvarno zabeleži.
  await db.from("scan_events").insert({ pet_id: pet.id });

  const isRoaming = pet.page_mode === "roaming";

  return (
    <div>
      <div className="nav">
        <a className="brand" href="/"><img src="/logo.png" alt="Vrati Me Kući" className="brandlogo" /> Vrati Me Kući</a>
      </div>

      <div className="scanwrap">
        <div className="scancard">
          {isRoaming ? (
            <>
              <div className="pplabel">🐾</div>
              <div className="ppname">Sve je u redu</div>
              <p className="scanRoamingP">
                <strong>{pet.pet_name}</strong> je slobodan i nije izgubljen. Ovo je normalno —
                nema potrebe za brigom niti pozivom.
              </p>
              {pet.show_phone1 && (
                <a className="callbtn callbtnSecondary" href={`tel:${pet.phone1_country}${pet.phone1}`}>
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
                <a className="callbtn callbtnSecondary" href={`tel:${pet.phone2_country}${pet.phone2}`}>
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
                <p style={{ fontSize: 13.5, color: "#666", textAlign: "center" }}>
                  Vlasnik nije ostavio javni kontakt.
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <ScanFooter />
    </div>
  );
}
