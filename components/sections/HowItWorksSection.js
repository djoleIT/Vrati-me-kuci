"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import ScanPreview from "@/components/ScanPreview";

export default function HowItWorksSection() {
  const { t } = useI18n();
  return (
    <section>
      <div className="pagesection"><h1>{t.navHowItWorks}</h1></div>
      <div className="panel">
        <div className="panelhead"><h2>{t.scanSectionTitle}</h2></div>
        <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center" }}>
          <ScanPreview mode="contact" />
          <ScanPreview mode="roaming" />
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "rgba(243,238,226,0.55)", marginTop: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          {t.scanSectionNote}
        </p>
      </div>
    </section>
  );
}
