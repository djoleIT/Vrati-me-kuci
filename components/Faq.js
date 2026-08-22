"use client";
import React, { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/config";

const ITEMS = [
  {
    q: "Da li ovo stvarno radi?",
    a: "Da. Svaki privezak ima svoj jedinstveni QR kod koji vodi na pravu, živu stranicu sa tvojim kontakt podacima. Skeniraj bilo koji QR kod telefonom da probaš.",
  },
  {
    q: "Kako se plaća?",
    a: "Pouzećem — plaćaš kuriru gotovinom ili karticom u trenutku kad ti privezak stigne na adresu. Ne tražimo broj kartice unapred.",
  },
  {
    q: "Ko vidi moje podatke?",
    a: "Samo ono što ti sam izabereš da bude javno vidljivo posle skeniranja (npr. telefon). Kućnu adresu koristimo isključivo za slanje priveska i ona se nikad ne prikazuje javno, osim ako to eksplicitno ne uključiš.",
  },
  {
    q: "Mogu li kasnije da promenim broj telefona?",
    a: "Da, javi nam se na email ispod i ažuriraćemo profil — privezak i QR kod ostaju isti, menja se samo sadržaj iza njega.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq">
      {ITEMS.map((item, i) => (
        <div className="faqitem" key={i}>
          <button className="faqq" onClick={() => setOpen(open === i ? null : i)}>
            <span>{item.q}</span>
            <span className="faqchevron">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && <div className="faqa">{item.a}</div>}
        </div>
      ))}
      <p className="faqcontact">
        Imaš drugo pitanje? Piši nam na{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </div>
  );
}
