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
          <Link href="/naruci?tag=standard" className="tagoption">
            <div className="tagoptionhead">
              <span>{t.tagStandard}</span>
              <span className="tagoptionprice">{PROMO_PRICE} din</span>
            </div>
            <p style={{ marginBottom: 10 }}>
              <span className="pricestrike" style={{ marginRight: 8 }}>{REGULAR_PRICE} din</span>
              {t.promoLabel}
            </p>
            <p>{t.tagStandardDesc}</p>
            <span className="tagoptioncta">{t.orderStandardCta}</span>
          </Link>
          <Link href="/naruci?tag=engraved" className="tagoption" style={{ borderColor: "var(--brass)" }}>
            <div className="tagoptionhead">
              <span>{t.tagEngraved}</span>
              <span className="tagoptionprice">{ENGRAVED_PRICE} din</span>
            </div>
            <p>{t.tagEngravedDesc}</p>
            <span className="tagoptioncta">{t.orderEngravedCta}</span>
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "rgba(243,238,226,0.55)", marginTop: 18, textAlign: "center" }}>
          {t.priceIncludesNote}
        </p>
      </div>
    </div>
  );
}
