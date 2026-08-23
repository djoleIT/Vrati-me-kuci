"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShieldCheck, Smartphone, Ban, Heart, BadgeCheck, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import ScanPreview from "@/components/ScanPreview";
import TrustBar from "@/components/TrustBar";

function qrPngUrl(data, size = 230) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
}
function stripProtocol(url) {
  return url.replace(/^https?:\/\//, "");
}

export default function Home() {
  const { t } = useI18n();
  const [origin, setOrigin] = useState("");
  const stageRef = useRef(null);
  const REST_TILT = { x: -6, y: -8 };
  const [tilt, setTilt] = useState(REST_TILT);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const demoUrl = origin ? `${origin}/p/demo` : "";

  function handleMove(e) {
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -12, y: px * 16 });
  }
  function handleLeave() {
    setTilt(REST_TILT);
  }

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
          <p className="roamingCallout">
            🐾 <strong>{t.statusRoamingTitle}</strong> — {t.statusRoamingDesc}
          </p>
          <div className="herocta">
            <Link href="/naruci" className="primary" style={{ textDecoration: "none" }}>
              {t.navOrder} <ArrowRight size={16} />
            </Link>
            <span className="heroctaNote">{t.riskFreeNote}</span>
          </div>
        </div>

        <div
          ref={stageRef}
          className="tagstage"
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
        >
          <a href={demoUrl || undefined} target="_blank" rel="noreferrer" className="tagcard3d" aria-label={t.scanCta}>
            <span className="livebadge"><span className="livedot" /> LIVE</span>
            <div className="ring" />
            <div
              className="tag"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <div className="name">Luna</div>
              <div className="qrbox">
                {demoUrl ? <img src={qrPngUrl(demoUrl, 230)} alt="Probni QR kod" /> : <div className="qrboxPlaceholder" />}
              </div>
              <div className="url">{demoUrl ? stripProtocol(demoUrl) : "..."}</div>
            </div>
          </a>
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noreferrer" className="tryqrbtn">
              📱 {t.scanCta}
            </a>
          )}
          <p className="tagcardnote">{t.tagcardNote}</p>
        </div>
      </div>

      <TrustBar />

      <div className="panel">
        <div className="panelhead"><h2>{t.navHowItWorks}</h2></div>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start", justifyContent: "center" }}>
          <ScanPreview mode="contact" />
          <ScanPreview mode="roaming" />
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/kako-radi" className="ghost" style={{ textDecoration: "none" }}>{t.viewFullProcess}</Link>
        </div>
      </div>

      <div className="centercta">
        <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          {t.navOrder} <ArrowRight size={16} style={{ marginLeft: 6 }} />
        </Link>
        <p className="madeInSerbia">🇷🇸 {t.madeInSerbia}</p>
      </div>
    </div>
  );
}
