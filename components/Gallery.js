"use client";
import React, { useState } from "react";

// Prave 3D renderovane slike opcija — već su deo projekta (public/images/options/).
const OPTIONS = [
  { src: "/images/options/ring-with-name.png", caption: "Alkica — sa imenom" },
  { src: "/images/options/ring-no-name.png", caption: "Alkica — samo QR kod" },
  { src: "/images/options/strap-with-name.png", caption: "Traka za navlačenje — sa imenom" },
  { src: "/images/options/strap-no-name.png", caption: "Traka za navlačenje — samo QR kod" },
];

// Kad dobiješ PRAVE fotografije (privezak stvarno na ogrlici, ne 3D render),
// samo ih ubaci u /public/images/gallery/ pod ovim imenima (1.jpg, 2.jpg, 3.jpg)
// — automatski će zameniti placeholder ispod, bez izmene koda.
const REAL_PHOTOS = [
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

function ImageGrid({ items }) {
  const [failed, setFailed] = useState({});
  return (
    <div className="gallery">
      {items.map((slot, i) => (
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

export default function Gallery() {
  return (
    <div>
      <h3 className="gallerySectionTitle">Dostupne opcije</h3>
      <p className="gallerySectionNote">
        Biraš tip pričvršćivanja (alkica ili traka za navlačenje) i da li ime ljubimca stoji na privesku.
      </p>
      <ImageGrid items={OPTIONS} />

      <h3 className="gallerySectionTitle" style={{ marginTop: 40 }}>Kako izgleda u stvarnosti</h3>
      <ImageGrid items={REAL_PHOTOS} />
    </div>
  );
}
