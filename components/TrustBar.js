"use client";
import React from "react";
import { Ban, Smartphone, ShieldCheck, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ICONS = [Ban, Smartphone, ShieldCheck, Heart];

export default function TrustBar() {
  const { t } = useI18n();

  return (
    <div className="trustsection">
      <div className="factsgrid">
        {t.trustFacts.map((f, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div className="factcard" key={i}>
              <div className="factIcon"><Icon size={20} /></div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
