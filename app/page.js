"use client";
import React, { useState } from "react";
import { useI18n, LANGS } from "@/lib/i18n";
import { COUNTRIES } from "@/lib/countries";

function qrPngUrl(data, size = 260) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
}

const empty = {
  petName: "", ownerName: "",
  phone1Country: "+381", phone1: "",
  phone2Country: "+381", phone2: "",
  notes: "",
  showPhone1: true, showPhone2: false, showNotes: true,
  street: "", city: "", municipality: "", postal: "", country: "Srbija",
  deliveryPhone: "", deliveryEmail: "", showAddressPublic: false,
};

export default function Home() {
  const { lang, setLang, t } = useI18n();
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState("form");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = form.petName.trim() && form.phone1.trim() &&
    form.street.trim() && form.city.trim() && form.postal.trim() && form.deliveryPhone.trim();

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");
      setResult({ slug: data.slug, petName: form.petName });
      setStep("done");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const publicUrl = result ? `${typeof window !== "undefined" ? window.location.origin : ""}/p/${result.slug}` : "";

  return (
    <div>
      <div className="nav">
        <a className="brand" href="/"><span className="dot" /> Vrati Me Kući</a>
        <div className="langswitch">
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>
      </div>

      {step === "form" && (
        <>
          <div className="hero">
            <div>
              <div className="eyebrow">Besplatan profil · fizički privezak pouzećem</div>
              <h1 dangerouslySetInnerHTML={{ __html: t.tagline.replace("QR", "<em>QR</em>") }} />
              <p className="sub">{t.heroSub}</p>
            </div>
            <div className="tagcard">
              <div className="ring" />
              <div className="tag">
                <div className="name">{form.petName || t.petName}</div>
                <div className="qrbox"><img src={qrPngUrl("https://vratimekuci.rs/p/demo", 220)} alt="QR" /></div>
                <div className="url">vratimekuci.rs/p/····</div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panelhead"><h2>{t.createProfile}</h2></div>

            <div className="grid2">
              <div className="field">
                <label>{t.petName} *</label>
                <input value={form.petName} onChange={(e) => setForm({ ...form, petName: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.ownerName}</label>
                <input value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} />
              </div>

              <div className="field">
                <label>{t.phone1} *</label>
                <div className="phonefield">
                  <select value={form.phone1Country} onChange={(e) => setForm({ ...form, phone1Country: e.target.value })}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>)}
                  </select>
                  <input value={form.phone1} onChange={(e) => setForm({ ...form, phone1: e.target.value })} placeholder="6X XXX XXXX" />
                </div>
              </div>
              <div className="field">
                <label>{t.phone2}</label>
                <div className="phonefield">
                  <select value={form.phone2Country} onChange={(e) => setForm({ ...form, phone2Country: e.target.value })}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>)}
                  </select>
                  <input value={form.phone2} onChange={(e) => setForm({ ...form, phone2: e.target.value })} />
                </div>
              </div>

              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>{t.notes}</label>
                <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>

            <div className="privacy">
              <h4>{t.privacyTitle}</h4>
              <Toggle label={t.showPhone1} on={form.showPhone1} onClick={() => setForm({ ...form, showPhone1: !form.showPhone1 })} />
              <Toggle label={t.showPhone2} on={form.showPhone2} onClick={() => setForm({ ...form, showPhone2: !form.showPhone2 })} />
              <Toggle label={t.showNotes} on={form.showNotes} onClick={() => setForm({ ...form, showNotes: !form.showNotes })} />
            </div>

            <div className="panelhead" style={{ marginTop: 8 }}><h2 style={{ fontSize: 18 }}>Adresa za dostavu (za kurira)</h2></div>
            <div className="grid3">
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>{t.street} *</label>
                <input value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.city} *</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.municipality}</label>
                <input value={form.municipality} onChange={(e) => setForm({ ...form, municipality: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.postal} *</label>
                <input value={form.postal} onChange={(e) => setForm({ ...form, postal: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.country}</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.deliveryPhone} *</label>
                <input value={form.deliveryPhone} onChange={(e) => setForm({ ...form, deliveryPhone: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.deliveryEmail}</label>
                <input value={form.deliveryEmail} onChange={(e) => setForm({ ...form, deliveryEmail: e.target.value })} />
              </div>
            </div>
            <div className="togglerow" style={{ marginBottom: 20 }}>
              <span>{t.showAddress}</span>
              <div className={`switch ${form.showAddressPublic ? "on" : ""}`} onClick={() => setForm({ ...form, showAddressPublic: !form.showAddressPublic })}>
                <div className="knob" />
              </div>
            </div>

            {error && <div className="error">{error}</div>}
            <button className="primary" disabled={!canSubmit || loading} onClick={submit}>
              {loading ? "..." : t.order}
            </button>
          </div>
        </>
      )}

      {step === "done" && result && (
        <div className="panel">
          <div className="panelhead"><h2>Narudžbina primljena ✓</h2></div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <div className="tagcard" style={{ width: 240 }}>
              <div className="ring" />
              <div className="tag">
                <div className="name">{result.petName}</div>
                <div className="qrbox"><img src={qrPngUrl(publicUrl, 220)} alt="QR" /></div>
                <div className="url">{publicUrl.replace(/^https?:\/\//, "")}</div>
              </div>
            </div>
            <div style={{ maxWidth: 400 }}>
              <p style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.6 }}>
                Ovaj QR kod već radi — skeniraj ga telefonom, otvoriće se prava stranica.
                Privezak ide u 3D štampu i stiže ti pouzećem.
              </p>
              <a className="ghost" href={publicUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", textDecoration: "none" }}>
                Otvori javnu stranicu →
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="footerlink"><a href="/admin">Admin</a></div>
    </div>
  );
}

function Toggle({ label, on, onClick }) {
  return (
    <div className="togglerow">
      <span>{label}</span>
      <div className={`switch ${on ? "on" : ""}`} onClick={onClick}><div className="knob" /></div>
    </div>
  );
}
