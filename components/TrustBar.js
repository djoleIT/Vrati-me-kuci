"use client";
import React from "react";
import { Ban, Smartphone, ShieldCheck, Heart, BadgeCheck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ICONS = [Ban, Smartphone, ShieldCheck, Heart];

export default function TrustBar() {
  const { t } = useI18n();

  return (
    <div className="trustsection">
      <div className="warrantyCard">
        <div className="warrantyIcon"><BadgeCheck size={26} /></div>
        <div>
          <h3>{t.warrantyTitle.replace("🛡 ", "")}</h3>
          <p>{t.warrantyText}</p>
        </div>
      </div>

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
