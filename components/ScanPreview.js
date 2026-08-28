"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function ScanPreview({ mode = "contact" }) {
  const { t } = useI18n();

  return (
    <div className="scanpreview">
      <div className="phone">
        <div className="phonescreen">
          {mode === "contact" ? (
            <>
              <div className="pplabel">{t.scanFoundLabel}</div>
              <div className="ppname">Luna</div>
              <div className="callbtn">{t.scanCallPrefix} Miloša</div>
              <div className="infoline">{t.scanAllergyNote}</div>
            </>
          ) : (
            <>
              <div className="pplabel">🐾</div>
              <div className="ppname">{t.scanRoamingLabel}</div>
              <p style={{ fontSize: 12.5, color: "#555", textAlign: "center", lineHeight: 1.5, padding: "0 6px" }}>
                {t.scanRoamingText.replace("{name}", "Reks")}
              </p>
            </>
          )}
        </div>
      </div>
      <p className="scanpreviewcaption">
        {mode === "contact" ? t.scanCaptionContact : t.scanCaptionRoaming}
      </p>
    </div>
  );
}
