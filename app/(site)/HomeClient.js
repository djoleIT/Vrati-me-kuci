"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import ScanPreview from "@/components/ScanPreview";

function qrPngUrl(data, size = 220) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
}

function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}

export default function Home() {
  const { t } = useI18n();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const demoUrl = origin ? `${origin}/p/demo` : "";

  return (
    <div>
      <div className="hero">
        <div>
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: t.tagline.replace("QR", "<em>QR</em>") }} />
          <div className="heropoints">
            {t.heroPoints.map((p, i) => (
              <div className="heropoint" key={i}>
                <span className="heropointnum">{i + 1}</span>
                <div>
                  <strong>{p.title}:</strong> <span>{p.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="trustrow">
            {t.trustBadges.map((b, i) => (
              <span className="trustbadge" key={i}>✓ {b}</span>
            ))}
          </div>
          <p className="roamingCallout">
            🐾 {t.statusRoamingTitle} — {t.statusRoamingDesc}
          </p>
          <Link href="/naruci" className="primary" style={{ display: "inline-flex", marginTop: 18, textDecoration: "none" }}>
            {t.navOrder} →
          </Link>
        </div>

        <div className="tagcard tagcardlive">
          <div className="ring" />
          <div className="tag">
            <div className="name">Luna</div>
            <div className="qrbox">
              {demoUrl ? <img src={qrPngUrl(demoUrl, 220)} alt="Probni QR kod" /> : <div className="qrboxPlaceholder" />}
            </div>
            <div className="url">{demoUrl ? stripProtocol(demoUrl) : "..."}</div>
          </div>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noreferrer" className="tryqrbtn">
              📱 {t.scanCta}
            </a>
          )}
          <p className="tagcardnote">{t.tagcardNote}</p>
        </div>
      </div>

      <div className="noSubBanner">{t.noSubBanner}</div>

      <div className="factsgrid">
        {t.trustFacts.map((f, i) => (
          <div className="factcard" key={i}>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>

      <div className="panel">
        <div className="panelhead"><h2>{t.navHowItWorks}</h2></div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
          <ScanPreview mode="contact" />
          <ScanPreview mode="roaming" />
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/kako-radi" className="ghost" style={{ textDecoration: "none" }}>{t.viewFullProcess}</Link>
        </div>
      </div>

      <div className="centercta">
        <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          {t.navOrder} →
        </Link>
      </div>
    </div>
  );
}
