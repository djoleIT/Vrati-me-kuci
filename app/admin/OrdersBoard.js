"use client";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ORDER_STATUSES, formatDin } from "@/lib/site";

export default function OrdersBoard({ orders }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("sve");
  const [open, setOpen] = useState(null);
  const list = orders || [];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return list.filter((o) => {
      if (status !== "sve" && o.status !== status) return false;
      if (!s) return true;
      const pet = o.pets || {};
      const addr = pet.owner_addresses?.[0] || {};
      const blob = [
        pet.pet_name,
        pet.owner_name,
        pet.phone1,
        pet.phone2,
        pet.slug,
        pet.notes,
        addr.street,
        addr.city,
        addr.postal_code,
        addr.contact_phone,
        addr.contact_email,
        o.admin_note,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return blob.includes(s);
    });
  }, [list, q, status]);

  return (
    <div>
      <div className="adminfilters">
        <input
          placeholder="Pretraga: ime, telefon, grad, slug…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="sve">Svi statusi</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="muted">
          {filtered.length} / {list.length}
        </span>
      </div>

      <div className="orderlist">
        {filtered.map((o) => {
          const pet = o.pets || {};
          const addr = pet.owner_addresses?.[0];
          const expanded = open === o.id;
          return (
            <article key={o.id} className="ordercard">
              <header
                className="orderhead"
                onClick={() => setOpen(expanded ? null : o.id)}
              >
                <div>
                  <strong>{pet.pet_name || "—"}</strong>
                  <div className="muted">
                    {new Date(o.created_at).toLocaleString("sr-RS")} · /p/{pet.slug}
                  </div>
                </div>
                <div className="orderheadright">
                  <span className={`pill ${o.status}`}>{o.status}</span>
                  <span>{formatDin(o.total)}</span>
                </div>
              </header>

              <div className="ordershort">
                <div>
                  <h4>Kupac</h4>
                  <p>{pet.owner_name || "—"}</p>
                  <p>
                    <a href={`tel:${pet.phone1_country}${pet.phone1}`}>
                      {pet.phone1_country} {pet.phone1}
                    </a>
                  </p>
                </div>
                <div>
                  <h4>Isporuka</h4>
                  {addr ? (
                    <p>
                      {addr.street}
                      <br />
                      {addr.postal_code} {addr.city}
                      {addr.municipality ? `, ${addr.municipality}` : ""}
                      <br />
                      {addr.country}
                    </p>
                  ) : (
                    <p>—</p>
                  )}
                </div>
                <div className="orderacts" onClick={(e) => e.stopPropagation()}>
                  <StatusSelect orderId={o.id} current={o.status} />
                  <a className="svglink" href={`/api/qr/${pet.slug}`} target="_blank" rel="noreferrer">
                    SVG za štampu
                  </a>
                </div>
              </div>

              {expanded && (
                <div className="orderfull">
                  <dl>
                    <dt>Ljubimac</dt>
                    <dd>{pet.pet_name}</dd>
                    <dt>Vlasnik</dt>
                    <dd>{pet.owner_name || "—"}</dd>
                    <dt>Telefon 1</dt>
                    <dd>
                      {pet.phone1_country} {pet.phone1}{" "}
                      {pet.show_phone1 ? "(javno)" : "(skriveno)"}
                    </dd>
                    <dt>Telefon 2</dt>
                    <dd>
                      {pet.phone2 ? `${pet.phone2_country} ${pet.phone2}` : "—"}{" "}
                      {pet.phone2 && (pet.show_phone2 ? "(javno)" : "(skriveno)")}
                    </dd>
                    <dt>Napomene (profil)</dt>
                    <dd>{pet.notes || "—"}</dd>
                    <dt>Email</dt>
                    <dd>
                      {addr?.contact_email ? (
                        <a href={`mailto:${addr.contact_email}`}>{addr.contact_email}</a>
                      ) : (
                        "—"
                      )}
                    </dd>
                    <dt>Telefon za kurira</dt>
                    <dd>
                      {addr?.contact_phone ? (
                        <a href={`tel:${addr.contact_phone}`}>{addr.contact_phone}</a>
                      ) : (
                        "—"
                      )}
                    </dd>
                    <dt>Adresa</dt>
                    <dd>
                      {addr
                        ? `${addr.street}, ${addr.postal_code} ${addr.city}${
                            addr.municipality ? `, ${addr.municipality}` : ""
                          }, ${addr.country}`
                        : "—"}
                    </dd>
                    <dt>Grad javno</dt>
                    <dd>{addr?.show_address_public ? "Da" : "Ne"}</dd>
                    <dt>Iznos</dt>
                    <dd>
                      privezak {formatDin(o.price)} + dostava {formatDin(o.shipping)} ={" "}
                      {formatDin(o.total)}
                    </dd>
                  </dl>
                  <AdminNote orderId={o.id} current={o.admin_note || ""} />
                  <CopyBlock
                    text={[
                      pet.owner_name,
                      addr?.street,
                      `${addr?.postal_code || ""} ${addr?.city || ""}`,
                      addr?.country,
                      addr?.contact_phone,
                      addr?.contact_email,
                      `QR: /p/${pet.slug}`,
                    ]
                      .filter(Boolean)
                      .join("\n")}
                  />
                </div>
              )}
            </article>
          );
        })}
        {filtered.length === 0 && <p className="muted">Nema narudžbina za ovu pretragu.</p>}
      </div>
    </div>
  );
}

function StatusSelect({ orderId, current }) {
  const [status, setStatus] = useState(current);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function change(e) {
    const value = e.target.value;
    setStatus(value);
    await fetch(`/api/orders/${orderId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value }),
    });
    startTransition(() => router.refresh());
  }

  return (
    <select value={status} onChange={change} style={{ width: "auto", opacity: pending ? 0.5 : 1 }}>
      {ORDER_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

function AdminNote({ orderId, current }) {
  const [note, setNote] = useState(current);
  const [saved, setSaved] = useState(false);

  async function save() {
    await fetch(`/api/orders/${orderId}/note`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="field">
      <label>Interna napomena</label>
      <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="ghost" type="button" onClick={save} style={{ marginTop: 8 }}>
        {saved ? "Sačuvano" : "Sačuvaj napomenu"}
      </button>
    </div>
  );
}

function CopyBlock({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      className="ghost"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1200);
      }}
    >
      {ok ? "Kopirano" : "Kopiraj podatke za kurira"}
    </button>
  );
}
