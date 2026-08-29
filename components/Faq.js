"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cpu, ScanLine } from "lucide-react";
import { CONTACT_EMAIL, REGULAR_PRICE, PROMO_PRICE, ENGRAVED_PRICE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import TagIcon from "@/components/TagIcon";

const ITEMS = [
  {
    id: "radi",
    q: "Da li ovo stvarno radi?",
    a: "Da. Svaki privezak ima svoj jedinstveni QR kod koji vodi na pravu, živu stranicu sa tvojim kontakt podacima. Skeniraj bilo koji QR kod telefonom da probaš.",
  },
  {
    id: "cena",
    q: "Koliko košta i kako se plaća?",
    a: null, // renderuje se posebno ispod, uključuje cene i dugmad
  },
  {
    id: "cip",
    q: "Da li je QR privezak bolji od čipovanja?",
    a: null, // renderuje se posebno ispod, detaljno poređenje
  },
  {
    id: "podaci",
    q: "Ko vidi moje podatke?",
    a: "Samo ono što ti sam izabereš da bude javno vidljivo posle skeniranja (npr. telefon). Kućnu adresu koristimo isključivo za slanje priveska i ona se nikad ne prikazuje javno, osim ako to eksplicitno ne uključiš.",
  },
  {
    id: "izmena",
    q: "Mogu li kasnije da promenim broj telefona?",
    a: "Da, javi nam se na email ispod i ažuriraćemo profil — privezak i QR kod ostaju isti, menja se samo sadržaj iza njega.",
  },
];

export default function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const idx = ITEMS.findIndex((it) => it.id === hash);
    if (idx >= 0) {
      setOpen(idx);
      setTimeout(() => refs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
    }
  }, []);

  return (
    <div className="faq">
      {ITEMS.map((item, i) => (
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
                  <div className="tagoptions" style={{ marginTop: 14 }}>
                    <Link href="/naruci?tag=standard" className="tagoption">
                      <TagIcon variant="ring" showName engraved={false} />
                      <div className="tagoptionhead">
                        <span>{t.tagStandard}</span>
                        <span className="tagoptionprice">{PROMO_PRICE} din</span>
                      </div>
                      <p style={{ marginBottom: 6 }}>
                        <span className="pricestrike" style={{ marginRight: 8 }}>{REGULAR_PRICE} din</span>
                        {t.promoLabel}
                      </p>
                      <p>{t.tagStandardDesc}</p>
                      <span className="tagoptioncta">{t.orderStandardCta}</span>
                    </Link>
                    <Link href="/naruci?tag=engraved" className="tagoption" style={{ borderColor: "var(--brass)" }}>
                      <TagIcon variant="ring" showName engraved />
                      <div className="tagoptionhead">
                        <span>{t.tagEngraved}</span>
                        <span className="tagoptionprice">{ENGRAVED_PRICE} din</span>
                      </div>
                      <p>{t.tagEngravedDesc}</p>
                      <span className="tagoptioncta">{t.orderEngravedCta}</span>
                    </Link>
                  </div>
                  <p style={{ marginTop: 14 }}>{t.priceIncludesNote}</p>
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

              {item.a && item.a}
            </div>
          )}
        </div>
      ))}
      <p className="faqcontact">
        Imaš drugo pitanje? Piši nam na{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </div>
  );
}
