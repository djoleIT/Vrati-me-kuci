import { supabaseAdmin } from "@/lib/supabase-admin";
import OrdersBoard from "./OrdersBoard";

export default async function AdminPage() {
  const db = supabaseAdmin();

  const { data: orders } = await db
    .from("orders")
    .select("*, pets(*, owner_addresses(*))")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="nav">
        <a className="brand" href="/">
          <span className="dot" /> Vrati Me Kući — Admin
        </a>
        <form action="/admin/logout" method="post">
          <button className="ghost" style={{ padding: "8px 14px" }}>
            Odjava
          </button>
        </form>
      </div>

      <div className="panel" style={{ marginTop: 28, maxWidth: 1100 }}>
        <div className="panelhead">
          <h2>Narudžbine ({orders?.length || 0})</h2>
        </div>
        <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
          Kupac, telefoni, adresa za kurira, QR za 3D štampu i status paketa.
        </p>
        <OrdersBoard orders={orders || []} />
      </div>
    </div>
  );
}
