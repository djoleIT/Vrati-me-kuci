"use client";
import { LANGS, useI18n } from "@/lib/i18n";

export default function SiteHeader({ compact }) {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="nav">
      <a className="brand" href="/">
        <span className="dot" /> Vrati Me Kući
      </a>
      {!compact && (
        <nav className="navlinks">
          <a href="#kako">{t.navHow}</a>
          <a href="#galerija">{t.galleryTitle}</a>
          <a href="#pitanja">{t.navFaq}</a>
          <a href="#naruci" className="navcta">
            {t.navOrder}
          </a>
        </nav>
      )}
      <div className="langswitch">
        <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Jezik">
          {LANGS.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
