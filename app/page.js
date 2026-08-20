"use client";
import React, { useState, useEffect } from "react";
import { useI18n, LANGS } from "@/lib/i18n";
import { COUNTRIES } from "@/lib/countries";
import { lettersOnly, digitsOnly } from "@/lib/validators";
import { makeSlug } from "@/lib/slug";
import { REGULAR_PRICE, PROMO_PRICE, ENGRAVED_PRICE, CONTACT_EMAIL, SMS_CONTACT } from "@/lib/config";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";

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
  tagType: "standard",
};

export default function Home() {
  const { lang, setLang, t } = useI18n();
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState("form");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");

  // Generišemo slug ODMAH kad se stranica učita — isti taj kod ostaje
  // do kraja, tako da je QR koji korisnik vidi tačno onaj koji se štampa.
  const [slug, setSlug] = useState("");
  useEffect(() => {
    setSlug(makeSlug());
    setOrigin(window.location.origin);
  }, []);

  const canSubmit = form.petName.trim() && form.phone1.trim() &&
    form.street.trim() && form.city.trim() && form.postal.trim() && form.deliveryPhone.trim();

  const liveUrl = origin && slug ? `${origin}/p/${slug}` : "";

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug }),
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

  const finalUrl = result ? `${origin}/p/${result.slug}` : "";

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

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
              <div className="heropoints">
                {t.heroPoints.map((p, i) => (
                  <div className="heropoint" key={i}>
                    <span className="heropointnum">{i + 1}</span>
                    <div>
                      <strong>{p.title}:</strong> <span>{p.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="trustrow">
                {t.trustBadges.map((b, i) => (
                  <span className="trustbadge" key={i}>✓ {b}</span>
                ))}
              </div>
            </div>
            <div className="tagcard">
              <div className="ring" />
              <div className="tag">
                <div className="name">{form.petName || t.petName}</div>
                <div className="qrbox">
                  {liveUrl ? (
                    <img src={qrPngUrl(liveUrl, 220)} alt="QR" />
                  ) : (
                    <div style={{ width: "100%", paddingTop: "100%" }} />
                  )}
                </div>
                <div className="url">{liveUrl ? liveUrl.replace(/^https?:\/\//, "") : "..."}</div>
              </div>
              <p className="tagcardnote">Ovo je pravi, radni QR kod — isti ide na tvoj privezak.</p>
            </div>
          </div>

          <div className="factsgrid">
            {t.trustFacts.map((f, i) => (
              <div className="factcard" key={i}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panelhead"><h2>{t.createProfile}</h2></div>

            <div className="grid2">
              <div className="field">
                <label>{t.petName} *</label>
                <input value={form.petName} onChange={(e) => set("petName", lettersOnly(e.target.value))} />
              </div>
              <div className="field">
                <label>{t.ownerName}</label>
                <input value={form.ownerName} onChange={(e) => set("ownerName", lettersOnly(e.target.value))} />
              </div>

              <div className="field">
                <label>{t.phone1} *</label>
                <div className="phonefield">
                  <select value={form.phone1Country} onChange={(e) => set("phone1Country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>)}
                  </select>
                  <input inputMode="numeric" value={form.phone1} onChange={(e) => set("phone1", digitsOnly(e.target.value))} placeholder="6X XXX XXXX" />
                </div>
              </div>
              <div className="field">
                <label>{t.phone2}</label>
                <div className="phonefield">
                  <select value={form.phone2Country} onChange={(e) => set("phone2Country", e.target.value)}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>)}
                  </select>
                  <input inputMode="numeric" value={form.phone2} onChange={(e) => set("phone2", digitsOnly(e.target.value))} />
                </div>
              </div>

              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>{t.notes}</label>
                <input value={form.notes} onChange={(e) => set("notes", e.target.value)} />
              </div>
            </div>

            <div className="privacy">
              <h4>{t.privacyTitle}</h4>
              <Toggle label={t.showPhone1} on={form.showPhone1} onClick={() => set("showPhone1", !form.showPhone1)} />
              <Toggle label={t.showPhone2} on={form.showPhone2} onClick={() => set("showPhone2", !form.showPhone2)} />
              <Toggle label={t.showNotes} on={form.showNotes} onClick={() => set("showNotes", !form.showNotes)} />
            </div>

            <div className="panelhead" style={{ marginTop: 8 }}><h2 style={{ fontSize: 18 }}>Adresa za dostavu (za kurira)</h2></div>
            <div className="grid3">
              <div className="field" style={{ gridColumn: "1 / -1" }}>
                <label>{t.street} *</label>
                <input value={form.street} onChange={(e) => set("street", e.target.value)} />
              </div>
              <div className="field">
                <label>{t.city} *</label>
                <input value={form.city} onChange={(e) => set("city", lettersOnly(e.target.value))} />
              </div>
              <div className="field">
                <label>{t.municipality}</label>
                <input value={form.municipality} onChange={(e) => set("municipality", lettersOnly(e.target.value))} />
              </div>
              <div className="field">
                <label>{t.postal} *</label>
                <input inputMode="numeric" value={form.postal} onChange={(e) => set("postal", digitsOnly(e.target.value))} />
              </div>
              <div className="field">
                <label>{t.country}</label>
                <input value={form.country} onChange={(e) => set("country", lettersOnly(e.target.value))} />
              </div>
              <div className="field">
                <label>{t.deliveryPhone} *</label>
                <input inputMode="numeric" value={form.deliveryPhone} onChange={(e) => set("deliveryPhone", digitsOnly(e.target.value))} />
              </div>
              <div className="field">
                <label>{t.deliveryEmail}</label>
                <input type="email" value={form.deliveryEmail} onChange={(e) => set("deliveryEmail", e.target.value)} />
              </div>
            </div>
            <div className="togglerow" style={{ marginBottom: 20 }}>
              <span>{t.showAddress}</span>
              <div className={`switch ${form.showAddressPublic ? "on" : ""}`} onClick={() => set("showAddressPublic", !form.showAddressPublic)}>
                <div className="knob" />
              </div>
            </div>

            <div className="panelhead" style={{ marginTop: 8 }}><h2 style={{ fontSize: 18 }}>Vrsta priveska</h2></div>
            <div className="tagoptions">
              <button
                type="button"
                className={`tagoption ${form.tagType === "standard" ? "selected" : ""}`}
                onClick={() => set("tagType", "standard")}
              >
                <div className="tagoptionhead">
                  <span>{t.tagStandard}</span>
                  <span className="tagoptionprice">{PROMO_PRICE} din</span>
                </div>
                <p>{t.tagStandardDesc}</p>
              </button>
              <button
                type="button"
                className={`tagoption ${form.tagType === "engraved" ? "selected" : ""}`}
                onClick={() => set("tagType", "engraved")}
              >
                <div className="tagoptionhead">
                  <span>{t.tagEngraved}</span>
                  <span className="tagoptionprice">{ENGRAVED_PRICE} din</span>
                </div>
                <p>{t.tagEngravedDesc}</p>
              </button>
            </div>

            <div className="pricebox">
              {form.tagType === "standard" && (
                <div>
                  <span className="pricelabel">{t.priceRegular}</span>
                  <span className="pricestrike">{REGULAR_PRICE} din</span>
                </div>
              )}
              <div className="pricetotal">
                <span className="pricelabel">{form.tagType === "engraved" ? t.tagEngraved : t.pricePromo}</span>
                <span className="pricenow">{form.tagType === "engraved" ? ENGRAVED_PRICE : PROMO_PRICE} din</span>
              </div>
            </div>

            {error && <div className="error">{error}</div>}
            <button className="primary" disabled={!canSubmit || loading} onClick={submit}>
              {loading ? "..." : t.order}
            </button>
            <p className="ordernote">
              {t.orderNote} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> {t.smsLabel}{" "}
              <a href={`sms:${SMS_CONTACT.replace(/\s/g, "")}`}>{SMS_CONTACT}</a>
            </p>
          </div>

          <div className="panel">
            <div className="panelhead"><h2>{t.galleryTitle}</h2></div>
            <Gallery />
          </div>

          <div className="panel">
            <div className="panelhead"><h2>{t.faqTitle}</h2></div>
            <Faq />
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
                <div className="qrbox"><img src={qrPngUrl(finalUrl, 220)} alt="QR" /></div>
                <div className="url">{finalUrl.replace(/^https?:\/\//, "")}</div>
              </div>
            </div>
            <div style={{ maxWidth: 420 }}>
              <p style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.6 }}>
                Ovaj QR kod već radi — skeniraj ga telefonom, otvoriće se prava stranica.
                Privezak ide u 3D štampu i stiže ti pouzećem.
              </p>
              <p style={{ color: "rgba(243,238,226,0.6)", fontSize: 13.5, marginBottom: 18 }}>
                {t.orderNote} <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>{" "}
                {t.smsLabel} <a href={`sms:${SMS_CONTACT.replace(/\s/g, "")}`} style={{ color: "var(--brass)" }}>{SMS_CONTACT}</a>
              </p>
              <a className="ghost" href={finalUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", textDecoration: "none" }}>
                Otvori javnu stranicu →
              </a>
            </div>
          </div>
        </div>
      )}

      <footer className="sitefooter">
        <div className="footerlinks">
          <a href="/privacy">Politika privatnosti</a>
          <a href="/terms">Uslovi korišćenja</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={`sms:${SMS_CONTACT.replace(/\s/g, "")}`}>SMS: {SMS_CONTACT}</a>
          <a href="/admin" className="footeradmin">Admin</a>
        </div>
        <p>© {new Date().getFullYear()} Vrati Me Kući</p>
      </footer>
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
