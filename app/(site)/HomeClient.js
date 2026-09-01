"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import ScanPreview from "@/components/ScanPreview";
import TrustBar from "@/components/TrustBar";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import { CONTACT_EMAIL } from "@/lib/config";

function qrPngUrl(data, size = 230) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(data)}`;
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
      {/* ===== POČETNA ===== */}
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
          <Link href="#cip" className="chipHookInline">
            🐾 <strong>{t.chipHookTitle}</strong> — {t.chipHookText} <span className="chipHookInlineArrow">{t.chipHookCta}</span>
          </Link>
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
            <div
              className="tag realTag"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <div className="tagslot tagslotLeft" />
              <div className="tagslot tagslotRight" />
              <div className="qrbox">
                {demoUrl ? <img src={qrPngUrl(demoUrl, 230)} alt="Probni QR kod" /> : <div className="qrboxPlaceholder" />}
              </div>
              <div className="name">Luna</div>
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

      <div className="priceHook">
        <h2>{t.priceHookTitle}</h2>
        <p>{t.priceHookText}</p>
      </div>

      <TrustBar />

      {/* ===== KAKO RADI ===== */}
      <section id="kako-radi" className="sectionAnchor">
        <div className="pagesection">
          <h1>{t.navHowItWorks}</h1>
        </div>
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

      {/* ===== SLIKE ===== */}
      <section id="galerija" className="sectionAnchor">
        <div className="pagesection"><h1>{t.galleryTitle}</h1></div>
        <div className="panel">
          <Gallery />
        </div>
      </section>

      {/* ===== PITANJA ===== */}
      <section id="faq" className="sectionAnchor">
        <div className="pagesection"><h1>{t.faqTitle}</h1></div>
        <div className="panel">
          <Faq />
        </div>
      </section>

      {/* ===== KONTAKT ===== */}
      <section id="kontakt" className="sectionAnchor">
        <div className="pagesection"><h1>{t.navContact}</h1></div>
        <div className="panel">
          <p style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
            {t.contactIntro}
          </p>
          <a className="ghost" href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: "none" }}>
            ✉ {CONTACT_EMAIL}
          </a>
        </div>
      </section>

      <div className="centercta">
        <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          {t.navOrder} <ArrowRight size={16} style={{ marginLeft: 6 }} />
        </Link>
        <p className="madeInSerbia">🇷🇸 {t.madeInSerbia}</p>
      </div>
    </div>
  );
}
