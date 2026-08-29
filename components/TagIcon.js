import React from "react";

// Mala ilustracija priveska: crn okvir, žuta (brass) površina, crn QR uzorak —
// isti kolorit kao pravi 3D štampan privezak (crno + žuto/mesing).
export default function TagIcon({ variant = "ring", showName = true, engraved = false }) {
  const face = engraved ? "#e8c766" : "#c9a24d";

  return (
    <svg viewBox="0 0 100 110" width="64" height="70" className="tagIconSvg">
      {/* Alkica (ring) ili prorezi (strap) pri vrhu */}
      {variant === "ring" ? (
        <>
          <circle cx="50" cy="10" r="7" fill="none" stroke="#101413" strokeWidth="4" />
        </>
      ) : (
        <>
          <rect x="28" y="4" width="7" height="16" rx="3" fill="#101413" />
          <rect x="65" y="4" width="7" height="16" rx="3" fill="#101413" />
        </>
      )}

      {/* Crni spoljašnji okvir */}
      <rect x="4" y="16" width="92" height="90" rx="16" fill="#101413" />
      {/* Žuta unutrašnja površina */}
      <rect x="12" y="24" width="76" height="74" rx="10" fill={face} />

      {/* QR uzorak (stilizovan, ne pravi kod — samo ilustracija) */}
      <g fill="#101413">
        <rect x="22" y="34" width="14" height="14" />
        <rect x="26" y="38" width="6" height="6" fill={face} />
        <rect x="64" y="34" width="14" height="14" />
        <rect x="68" y="38" width="6" height="6" fill={face} />
        <rect x="22" y="60" width="14" height="14" />
        <rect x="26" y="64" width="6" height="6" fill={face} />
        <rect x="42" y="34" width="6" height="6" />
        <rect x="50" y="34" width="6" height="6" />
        <rect x="42" y="42" width="6" height="6" />
        <rect x="54" y="42" width="6" height="6" />
        <rect x="46" y="50" width="6" height="6" />
        <rect x="60" y="52" width="6" height="6" />
        <rect x="42" y="58" width="6" height="6" />
        <rect x="50" y="60" width="6" height="6" />
        <rect x="60" y="64" width="6" height="6" />
        <rect x="70" y="56" width="6" height="6" />
        <rect x="42" y="68" width="6" height="6" />
      </g>

      {/* Ime — samo ako je showName uključeno */}
      {showName && (
        <rect x="32" y="86" width="36" height="7" rx="2" fill="#101413" opacity="0.85" />
      )}
    </svg>
  );
}
