import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata = { robots: { index: false, follow: false } };

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

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
      <header className="nav">
        <a className="brand" href="/"><span className="dot" /> Vrati Me Kući</a>
      </header>

      <main style={{ display: "flex", justifyContent: "center", padding: "60px 20px" }}>
        <div className="phone" style={{ width: 280 }}>
          <div className="phonescreen">
            <div className="pplabel">Ovaj ljubimac je pronađen</div>
            <div className="ppname">{pet.pet_name}</div>

            {pet.show_phone1 && (
              <a className="callbtn" href={`tel:${pet.phone1_country}${pet.phone1}`}>
                <PhoneIcon /> Pozovi {pet.owner_name || "vlasnika"}
              </a>
            )}
            {pet.show_phone2 && pet.phone2 && (
              <a className="callbtn" style={{ background: "var(--teal)" }} href={`tel:${pet.phone2_country}${pet.phone2}`}>
                <PhoneIcon /> Pozovi (dodatni broj)
              </a>
            )}
            {pet.show_notes && pet.notes && (
              <div className="infoline"><AlertIcon /> {pet.notes}</div>
            )}
            {address?.show_address_public && (
              <div className="infoline"><PinIcon /> {address.city}{address.municipality ? `, ${address.municipality}` : ""}, {address.country}</div>
            )}
            {!pet.show_phone1 && !pet.show_phone2 && (
              <p style={{ fontSize: 13, color: "#666", textAlign: "center" }}>
                Vlasnik nije ostavio javni kontakt.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
