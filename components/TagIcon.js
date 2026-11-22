import React from "react";

const IMAGES = {
  "ring-true": "/images/options/ring-with-name.png",
  "ring-false": "/images/options/ring-no-name.png",
  "strap-true": "/images/options/strap-with-name.png",
  "strap-false": "/images/options/strap-no-name.png",
};

// Prava 3D renderovana slika priveska (ne ilustracija) — bira se prema
// tipu pričvršćivanja i da li se prikazuje ime.
export default function TagIcon({ variant = "ring", showName = true }) {
  const src = IMAGES[`${variant}-${showName}`] || IMAGES["ring-true"];
  return <img src={src} alt="" className="tagIconImg" />;
}
