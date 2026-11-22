"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cpu, ScanLine } from "lucide-react";
import { CONTACT_EMAIL, REGULAR_PRICE, PROMO_PRICE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

export default function Faq() {
  const { t } = useI18n();
  const items = t.faqItems;
  const [open, setOpen] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const idx = items.findIndex((it) => it.id === hash);
    if (idx >= 0) {
      setOpen(idx);
      setTimeout(() => refs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="faq">
      {items.map((item, i) => (
        <div className="faqitem" key={i} id={item.id} ref={(el) => (refs.current[item.id] = el)}>
          <button className="faqq" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faqchevron">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <div className="faqa">
              {item.id === "cena" && (
                <div>
                  <p>{t.noSubBanner}</p>
                  <div className="pricebox" style={{ marginTop: 14 }}>
                    <div>
                      <span className="pricelabel">{t.priceRegular}</span>
                      <span className="pricestrike">{REGULAR_PRICE} din</span>
                    </div>
                    <div className="pricetotal">
                      <span className="pricelabel">{t.pricePromo}</span>
                      <span className="pricenow">{PROMO_PRICE} din</span>
                    </div>
                  </div>
                  <p style={{ marginTop: 14 }}>{t.priceIncludesNote}</p>
                  <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none", marginTop: 6 }}>
                    {t.navOrder} →
                  </Link>
                </div>
              )}

              {item.id === "cip" && (
                <div>
                  <p>{t.compareIntro}</p>
                  {t.compareSections.map((s, j) => (
                    <div className="compareRow" key={j}>
                      <h3 className="compareRowTitle">{s.title}</h3>
                      <div className="compareCols">
                        <div className="compareCol compareCol--chip">
                          <div className="compareColLabel"><Cpu size={14} /> Čip</div>
                          <p>{s.chip}</p>
                        </div>
                        <div className="compareCol compareCol--qr">
                          <div className="compareColLabel"><ScanLine size={14} /> QR privezak</div>
                          <p>{s.qr}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {item.a && <p>{item.a}</p>}
            </div>
          )}
        </div>
      ))}
      <p className="faqcontact">
        {t.faqContactPrefix}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </div>
  );
}
