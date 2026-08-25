"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL, REGULAR_PRICE, PROMO_PRICE, ENGRAVED_PRICE } from "@/lib/config";

function fillPrices(text) {
  return text
    .replace("{PROMO_PRICE}", PROMO_PRICE)
    .replace("{REGULAR_PRICE}", REGULAR_PRICE)
    .replace("{ENGRAVED_PRICE}", ENGRAVED_PRICE);
}

export default function TermsClient() {
  const { t } = useI18n();
  const p = t.terms;

  return (
    <div className="panel" style={{ marginTop: 28 }}>
      <div className="panelhead"><h2>{t.footerTerms}</h2></div>
      <div className="legaltext">
        <p><strong>{p.updated}:</strong> {new Date().toLocaleDateString()}</p>

        {p.sections.map((s, i) => (
          <div key={i}>
            <h3>{s.title}</h3>
            {s.body && <p>{fillPrices(s.body)}</p>}
          </div>
        ))}

        <h3>{p.contactTitle}</h3>
        <p>{p.contactBody}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
