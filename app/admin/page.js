import { supabaseAdmin } from "@/lib/supabase-admin";
import StatusSelect from "./StatusSelect";

export default async function AdminPage() {
  const db = supabaseAdmin();

  const { data: orders } = await db
    .from("orders")
    .select("*, pets(*, owner_addresses(*))")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="nav">
        <a className="brand" href="/"><span className="dot" /> Vrati Me Kući — Admin</a>
        <form action="/admin/logout" method="post"><button className="ghost" style={{ padding: "8px 14px" }}>Odjava</button></form>
      </div>

      <div className="panel" style={{ marginTop: 28, maxWidth: 1200 }}>
        <div className="panelhead"><h2>Narudžbine ({orders?.length || 0})</h2></div>
        <table className="ordertable">
          <thead>
            <tr>
              <th>Datum</th><th>Ljubimac</th><th>Vlasnik i kontakt</th><th>Adresa dostave</th>
              <th>Napomene</th><th>Ukupno</th><th>Status</th><th>QR</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o) => {
              const pet = o.pets;
              const addr = pet?.owner_addresses?.[0];
              return (
                <tr key={o.id}>
                  <td>{new Date(o.created_at).toLocaleDateString("sr-RS")}</td>
                  <td><strong>{pet?.pet_name}</strong><br /><span style={{ opacity: 0.5, fontSize: 11 }}>/p/{pet?.slug}</span></td>
                  <td>
                    {pet?.owner_name && <div>{pet.owner_name}</div>}
                    <a href={`tel:${pet?.phone1_country}${pet?.phone1}`} style={{ color: "var(--brass)" }}>
                      {pet?.phone1_country} {pet?.phone1}
                    </a>
                    {pet?.phone2 && <div><a href={`tel:${pet.phone2_country}${pet.phone2}`} style={{ color: "var(--brass)" }}>{pet.phone2_country} {pet.phone2}</a></div>}
                    {addr?.contact_email && <div style={{ fontSize: 12, opacity: 0.7 }}>{addr.contact_email}</div>}
                  </td>
                  <td>
                    {addr ? (
                      <>
                        {addr.street}<br />
                        {addr.postal_code} {addr.city}{addr.municipality ? `, ${addr.municipality}` : ""}<br />
                        {addr.country}<br />
                        <a href={`tel:${addr.contact_phone}`} style={{ color: "var(--brass)", fontSize: 12 }}>{addr.contact_phone}</a>
                      </>
                    ) : "—"}
                  </td>
                  <td style={{ maxWidth: 180 }}>{pet?.notes || "—"}</td>
                  <td>{o.total} din</td>
                  <td><StatusSelect orderId={o.id} current={o.status} /></td>
                  <td>
                    <a className="svglink" href={`/api/qr/${pet?.slug}`} target="_blank" rel="noreferrer">
                      Preuzmi SVG ↓
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
