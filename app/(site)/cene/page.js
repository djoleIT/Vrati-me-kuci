"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { REGULAR_PRICE, PROMO_PRICE, ENGRAVED_PRICE } from "@/lib/config";

export default function Cene() {
  const { t } = useI18n();

  return (
    <div>
      <div className="pagesection">
        <h1>{t.navPricing}</h1>
      </div>

      <div className="noSubBanner">{t.noSubBanner}</div>

      <div className="panel">
        <div className="tagoptions" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="tagoption" style={{ cursor: "default" }}>
            <div className="tagoptionhead">
              <span>{t.tagStandard}</span>
              <span className="tagoptionprice">{PROMO_PRICE} din</span>
            </div>
            <p style={{ marginBottom: 10 }}>
              <span className="pricestrike" style={{ marginRight: 8 }}>{REGULAR_PRICE} din</span>
              promo cena
            </p>
            <p>{t.tagStandardDesc}</p>
          </div>
          <div className="tagoption" style={{ cursor: "default", borderColor: "var(--brass)" }}>
            <div className="tagoptionhead">
              <span>{t.tagEngraved}</span>
              <span className="tagoptionprice">{ENGRAVED_PRICE} din</span>
            </div>
            <p>{t.tagEngravedDesc}</p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(243,238,226,0.55)", marginTop: 18, textAlign: "center" }}>
          Cena uključuje izradu, 3D štampu i dostavu. Plaćanje isključivo pouzećem — nema
          ostavljanja podataka kartice na sajtu.
        </p>
      </div>

      <div className="centercta">
        <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          {t.navOrder} →
        </Link>
      </div>
    </div>
  );
}
