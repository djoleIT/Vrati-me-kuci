"use client";
import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import ScanPreview from "@/components/ScanPreview";

export default function KakoRadi() {
  const { t } = useI18n();

  return (
    <div>
      <div className="pagesection">
        <h1>{t.navHowItWorks}</h1>
      </div>

      <div className="panel">
        <div className="heropoints" style={{ maxWidth: 640, margin: "0 auto" }}>
          {t.heroPoints.map((p, i) => (
            <div className="heropoint" key={i}>
              <span className="heropointnum">{i + 1}</span>
              <div>
                <strong>{p.title}:</strong> <span>{p.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <div className="panelhead"><h2>Šta vidi neko ko skenira privezak</h2></div>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center" }}>
          <ScanPreview mode="contact" />
          <ScanPreview mode="roaming" />
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "rgba(243,238,226,0.55)", marginTop: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Ti biraš koji od ova dva režima važi za tvog ljubimca prilikom pravljenja profila —
          bilo da želiš da te odmah pozovu, ili samo želiš da nalazač zna da je sve u redu.
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
