"use client";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export default function SiteFooter() {
  const { t, contactEmail } = useI18n();

  return (
    <footer className="sitefooter">
      <div className="footgrid">
        <div>
          <div className="brand" style={{ marginBottom: 10 }}>
            <span className="dot" /> Vrati Me Kući
          </div>
          <p>{t.footerNote}</p>
        </div>
        <div>
          <h4>{t.footerContact}</h4>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <p className="muted">Odgovaramo na pitanja o porudžbini i profilu.</p>
        </div>
        <div>
          <h4>Info</h4>
          <a href="/uslovi">{t.footerLegal}</a>
          <a href="/privatnost">{t.footerPrivacy}</a>
        </div>
      </div>
      <p className="copy">
        © {new Date().getFullYear()} {SITE.name}. Plaćanje pouzećem · Srbija
      </p>
    </footer>
  );
}
