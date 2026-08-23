"use client";
import React, { useState } from "react";

// Kad mi pošalješ prave slike, samo ih ubaci u /public/images/gallery/ pod ovim imenima
// (1.jpg, 2.jpg, 3.jpg) — automatski će zameniti placeholder, bez izmene koda.
const SLOTS = [
  { src: "/images/gallery/1.jpg", caption: "Privezak na ogrlici" },
  { src: "/images/gallery/2.jpg", caption: "Skeniranje QR koda" },
  { src: "/images/gallery/3.jpg", caption: "Odštampan privezak" },
];

function PawPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" style={{ display: "block" }}>
      <rect width="100" height="100" fill="#1e2624" />
      <circle cx="50" cy="60" r="16" fill="#2a332f" />
      <circle cx="34" cy="38" r="8" fill="#2a332f" />
      <circle cx="50" cy="30" r="8" fill="#2a332f" />
      <circle cx="66" cy="38" r="8" fill="#2a332f" />
    </svg>
  );
}

export default function Gallery() {
  const [failed, setFailed] = useState({});

  return (
    <div className="gallery">
      {SLOTS.map((slot, i) => (
        <figure className="galleryitem" key={i}>
          <div className="galleryimg">
            {failed[i] ? (
              <PawPlaceholder />
            ) : (
              <img
                src={slot.src}
                alt={slot.caption}
                onError={() => setFailed((f) => ({ ...f, [i]: true }))}
              />
            )}
          </div>
          <figcaption>{slot.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
