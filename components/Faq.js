"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Cpu, ScanLine } from "lucide-react";
import { CONTACT_EMAIL, REGULAR_PRICE, PROMO_PRICE } from "@/lib/config";
import { useI18n } from "@/lib/i18n";

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
