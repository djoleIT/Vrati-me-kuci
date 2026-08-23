"use client";
import React from "react";
import Link from "next/link";
import { Cpu, ScanLine, ArrowRight, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function CompareClient() {
  const { t } = useI18n();

  return (
    <div>
      <div className="pagesection">
        <h1>{t.compareTitle}</h1>
        <p className="sub">{t.compareIntro}</p>
      </div>

      <div className="panel">
        {t.compareSections.map((s, i) => (
          <div className="compareRow" key={i}>
            <h3 className="compareRowTitle">{s.title}</h3>
            <div className="compareCols">
              <div className="compareCol compareCol--chip">
                <div className="compareColLabel"><Cpu size={16} /> Čip</div>
                <p>{s.chip}</p>
              </div>
              <div className="compareCol compareCol--qr">
                <div className="compareColLabel"><ScanLine size={16} /> QR privezak</div>
                <p>{s.qr}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel conclusionPanel">
        <div className="conclusionIcon"><CheckCircle2 size={26} /></div>
        <div>
          <h3>{t.compareConclusionTitle}</h3>
          <p>{t.compareConclusionText}</p>
        </div>
      </div>

      <div className="centercta">
        <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          {t.navOrder} <ArrowRight size={16} style={{ marginLeft: 6 }} />
        </Link>
      </div>
    </div>
  );
}
