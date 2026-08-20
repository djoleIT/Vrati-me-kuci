"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { COUNTRIES } from "@/lib/countries";
import { SITE, formatDin, makeSlug } from "@/lib/site";
import {
  digitsOnly,
  emailOnly,
  isEmail,
  lettersOnly,
  notesOnly,
  streetOnly,
} from "@/lib/filters";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Gallery from "@/components/Gallery";
import TagPreview from "@/components/TagPreview";

function qrPngUrl(data, size = 260) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
}

const empty = {
  petName: "",
  ownerName: "",
  phone1Country: "+381",
  phone1: "",
  phone2Country: "+381",
  phone2: "",
  notes: "",
  showPhone1: true,
  showPhone2: false,
  showNotes: true,
  street: "",
  city: "",
  municipality: "",
  postal: "",
  country: "Srbija",
  deliveryPhone: "",
  deliveryEmail: "",
  showAddressPublic: false,
};

export default function Home() {
  const { t, pricePromo, priceRegular, shipping, total, contactEmail } = useI18n();
  const [form, setForm] = useState(empty);
  const [slug, setSlug] = useState("");
  const [origin, setOrigin] = useState("");
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    const saved = window.localStorage.getItem("vmk_slug");
    if (saved && /^[a-z0-9]{6,16}$/.test(saved)) setSlug(saved);
    else {
      const next = makeSlug();
      window.localStorage.setItem("vmk_slug", next);
      setSlug(next);
    }
  }, []);

  const qrTarget = slug
    ? `${origin || `https://${SITE.domain}`}/p/${slug}`
    : "";
  const publicPath = slug ? `${(origin || SITE.domain).replace(/^https?:\/\//, "")}/p/${slug}` : "";

  const canSubmit =
    form.petName.trim() &&
    form.phone1.trim() &&
    form.street.trim() &&
    form.city.trim() &&
    form.postal.length >= 4 &&
    form.deliveryPhone.trim() &&
    isEmail(form.deliveryEmail);

  async function submit() {
    if (!canSubmit || loading) return;
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
      setSlug(data.slug);
      window.localStorage.setItem("vmk_slug", makeSlug());
      setStep("done");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setForm(empty);
    const next = makeSlug();
    window.localStorage.setItem("vmk_slug", next);
    setSlug(next);
    setStep("form");
    setError("");
  }

  const faqs = useMemo(
    () => [
      [t.faq1q, t.faq1a],
      [t.faq2q, t.faq2a],
      [t.faq3q, t.faq3a],
      [t.faq4q, t.faq4a],
    ],
    [t]
  );

  return (
    <div>
      <SiteHeader />

      <section className="hero" id="kako">
        <div>
          <p className="eyebrow">Promo {pricePromo} · pouzeće</p>
          <ol className="steps">
            <li>
              <span>1</span>
              <div>
                <h2>{t.step1Title}</h2>
                <p>{t.step1Body}</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h2>{t.step2Title}</h2>
                <p>{t.step2Body}</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h2>{t.step3Title}</h2>
                <p>{t.step3Body}</p>
              </div>
            </li>
          </ol>
          <a className="primary" href="#naruci">
            {t.navOrder} — {pricePromo}
          </a>
        </div>
        <div className="herotag">
          <TagPreview
            petName={form.petName}
            qrUrl={qrPngUrl(qrTarget || `https://${SITE.domain}`)}
            publicPath={publicPath || `${SITE.domain}/p/····`}
          />
          <p className="qrhint">{t.liveQrHint}</p>
        </div>
      </section>

      <div className="trustrow">
        <div>{t.trustQr}</div>
        <div>{t.trustPrint}</div>
        <div>{t.trustCod}</div>
        <div>{t.trustPrivacy}</div>
      </div>

      <Gallery />

      <section className="section priceband">
        <div>
          <p className="eyebrow">{t.priceTitle}</p>
          <p className="was">
            {t.priceWas} <s>{priceRegular}</s>
          </p>
          <p className="now">
            {t.priceNow} <strong>{pricePromo}</strong>
          </p>
          <p>
            {t.shippingLabel}: {shipping}
          </p>
          <p className="total">
            {t.totalLabel}: {total}
          </p>
          <p className="muted">{t.codNote}</p>
        </div>
      </section>

      {step === "form" && (
        <div className="panel" id="naruci">
          <div className="panelhead">
            <h2>{t.createProfile}</h2>
          </div>
          <p className="muted" style={{ marginTop: -8, marginBottom: 22 }}>
            {t.orderIntro}
          </p>

          <div className="grid2">
            <Field label={`${t.petName} *`}>
              <input
                autoComplete="off"
                value={form.petName}
                onChange={(e) => setForm({ ...form, petName: lettersOnly(e.target.value) })}
              />
            </Field>
            <Field label={t.ownerName}>
              <input
                autoComplete="name"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: lettersOnly(e.target.value) })}
              />
            </Field>
            <Field label={`${t.phone1} *`}>
              <div className="phonefield">
                <select
                  value={form.phone1Country}
                  onChange={(e) => setForm({ ...form, phone1Country: e.target.value })}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.dial}>
                      {c.dial} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={form.phone1}
                  placeholder="6XXXXXXXX"
                  onChange={(e) => setForm({ ...form, phone1: digitsOnly(e.target.value) })}
                />
              </div>
            </Field>
            <Field label={t.phone2}>
              <div className="phonefield">
                <select
                  value={form.phone2Country}
                  onChange={(e) => setForm({ ...form, phone2Country: e.target.value })}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.dial}>
                      {c.dial} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  inputMode="numeric"
                  value={form.phone2}
                  onChange={(e) => setForm({ ...form, phone2: digitsOnly(e.target.value) })}
                />
              </div>
            </Field>
            <Field label={t.notes} wide>
              <input
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: notesOnly(e.target.value) })}
              />
            </Field>
          </div>

          <div className="privacy">
            <h4>{t.privacyTitle}</h4>
            <Toggle
              label={t.showPhone1}
              on={form.showPhone1}
              onClick={() => setForm({ ...form, showPhone1: !form.showPhone1 })}
            />
            <Toggle
              label={t.showPhone2}
              on={form.showPhone2}
              onClick={() => setForm({ ...form, showPhone2: !form.showPhone2 })}
            />
            <Toggle
              label={t.showNotes}
              on={form.showNotes}
              onClick={() => setForm({ ...form, showNotes: !form.showNotes })}
            />
            <Toggle
              label={t.showAddress}
              on={form.showAddressPublic}
              onClick={() => setForm({ ...form, showAddressPublic: !form.showAddressPublic })}
            />
          </div>

          <div className="panelhead" style={{ marginTop: 8 }}>
            <h2 style={{ fontSize: 18 }}>Adresa za dostavu</h2>
          </div>
          <div className="grid3">
            <Field label={`${t.street} *`} wide>
              <input
                autoComplete="street-address"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: streetOnly(e.target.value) })}
              />
            </Field>
            <Field label={`${t.city} *`}>
              <input
                autoComplete="address-level2"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: lettersOnly(e.target.value, 60) })}
              />
            </Field>
            <Field label={t.municipality}>
              <input
                value={form.municipality}
                onChange={(e) =>
                  setForm({ ...form, municipality: lettersOnly(e.target.value, 60) })
                }
              />
            </Field>
            <Field label={`${t.postal} *`}>
              <input
                inputMode="numeric"
                autoComplete="postal-code"
                value={form.postal}
                onChange={(e) => setForm({ ...form, postal: digitsOnly(e.target.value, 10) })}
              />
            </Field>
            <Field label={t.country}>
              <input
                autoComplete="country-name"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: lettersOnly(e.target.value, 60) })}
              />
            </Field>
            <Field label={`${t.deliveryPhone} *`}>
              <input
                inputMode="numeric"
                autoComplete="tel"
                value={form.deliveryPhone}
                onChange={(e) =>
                  setForm({ ...form, deliveryPhone: digitsOnly(e.target.value) })
                }
              />
            </Field>
            <Field label={t.deliveryEmail}>
              <input
                type="email"
                autoComplete="email"
                value={form.deliveryEmail}
                onChange={(e) => setForm({ ...form, deliveryEmail: emailOnly(e.target.value) })}
              />
            </Field>
          </div>

          <div className="ordersum">
            <div>
              <strong>{form.petName || t.petName}</strong>
              <div className="muted">{publicPath}</div>
            </div>
            <div className="sumprices">
              <span>
                Privezak <s>{priceRegular}</s> {pricePromo}
              </span>
              <span>
                {t.shippingLabel} {shipping}
              </span>
              <strong>
                {t.totalLabel} {total}
              </strong>
            </div>
          </div>

          {error && <div className="error">{error}</div>}
          <button className="primary" disabled={!canSubmit || loading} onClick={submit}>
            {loading ? "..." : t.order}
          </button>
          <p className="afterorder">
            {t.contactSoon} <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>
      )}

      {step === "done" && (
        <div className="panel" id="naruci">
          <div className="panelhead">
            <h2>{t.orderOk} ✓</h2>
          </div>
          <div className="donebox">
            <TagPreview
              petName={form.petName}
              qrUrl={qrPngUrl(qrTarget)}
              publicPath={publicPath}
            />
            <div>
              <p className="sub">{t.orderThanks}</p>
              <p>
                {t.questionsTo}{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
              <p>
                {t.totalLabel}: {formatDin(SITE.pricePromo + SITE.shipping)} (pouzeće)
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                <a className="ghost" href={qrTarget} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  {t.openPage} →
                </a>
                <button className="ghost" type="button" onClick={reset}>
                  {t.another}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="section" id="pitanja">
        <div className="sectionhead">
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faq">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, children, wide }) {
  return (
    <div className="field" style={wide ? { gridColumn: "1 / -1" } : undefined}>
      <label>{label}</label>
      {children}
    </div>
  );
}

function Toggle({ label, on, onClick }) {
  return (
    <div className="togglerow">
      <span>{label}</span>
      <div
        className={`switch ${on ? "on" : ""}`}
        onClick={onClick}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        role="switch"
        aria-checked={on}
        tabIndex={0}
      >
        <div className="knob" />
      </div>
    </div>
  );
}
