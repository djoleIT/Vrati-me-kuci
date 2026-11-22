"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import TrustBar from "@/components/TrustBar";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import GallerySection from "@/components/sections/GallerySection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";

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
          <Link href="/faq#cip" className="chipHookInline">
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
          <div className="tagcard3d">
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
          </div>
        </div>
      </div>

      <div className="priceHook">
        <h2>{t.priceHookTitle}</h2>
        <p>{t.priceHookText}</p>
      </div>

      <TrustBar />

      {/* Skrol kroz sve sekcije — svaka od njih ima i svoju samostalnu stranicu (tab) */}
      <HowItWorksSection />
      <GallerySection />
      <FaqSection />
      <ContactSection />

      <div className="centercta">
        <Link href="/naruci" className="primary" style={{ display: "inline-flex", textDecoration: "none" }}>
          {t.navOrder} <ArrowRight size={16} style={{ marginLeft: 6 }} />
        </Link>
        <p className="madeInSerbia">🇷🇸 {t.madeInSerbia}</p>
      </div>
    </div>
  );
}
