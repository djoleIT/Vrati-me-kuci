"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";

// Vodič za merenje ogrlice: slika ogrlice sa oznakom 1 (širina trake) i objašnjenjem.
const W = "#d6553c"; // širina

function Badge({ n, x, y, color, dark }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" fill={color} stroke="#101413" strokeWidth="1.5" />
      <text x={x} y={y + 4.2} textAnchor="middle" fontSize="12" fontWeight="800" fill={dark ? "#241c08" : "#fff"} fontFamily="Inter, sans-serif">{n}</text>
    </g>
  );
}

export default function CollarGuide() {
  const { t } = useI18n();
  return (
    <div className="collarGuide">
      <svg viewBox="0 0 444 290" className="collarSvg" role="img" aria-label={t.slotWidthName}>
        <defs>
          <marker id="cgArrW" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0 L8 4 L0 8 z" fill={W} />
          </marker>
        </defs>
        <image href="/images/collar-guide.png" x="0" y="0" width="444" height="290" />

        {/* 1 — širina trake (vidi se na levom kraju ogrlice) */}
        <line x1="12" y1="102" x2="56" y2="102" stroke={W} strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="12" y1="165" x2="56" y2="165" stroke={W} strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="26" y1="104" x2="26" y2="163" stroke={W} strokeWidth="2.2" markerStart="url(#cgArrW)" markerEnd="url(#cgArrW)" />
        <Badge n="1" x={26} y={84} color={W} />
      </svg>

      <div className="collarLegend">
        <div className="collarLegendRow">
          <span className="measureBadge measureBadge--w">1</span>
          <div><strong>{t.slotWidthName}</strong> — {t.slotWidthHelp}</div>
        </div>
      </div>
    </div>
  );
}
