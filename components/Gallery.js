"use client";
import React, { useState } from "react";
import { useI18n } from "@/lib/i18n";

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

function ImageGrid({ items, featured = false }) {
  const [failed, setFailed] = useState({});
  return (
    <div className={`gallery ${featured ? "galleryFeatured" : ""}`}>
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
  const { t } = useI18n();
  const c = t.galleryCaptions;

  // Prave 3D renderovane slike opcija — deo su projekta (public/images/options/).
  const options = [
    { src: "/images/options/ring-with-name.png", caption: c.ringWithName },
    { src: "/images/options/ring-no-name.png", caption: c.ringNoName },
    { src: "/images/options/strap-with-name.png", caption: c.strapWithName },
    { src: "/images/options/strap-no-name.png", caption: c.strapNoName },
  ];

  // Kad dobiješ PRAVE fotografije (privezak stvarno na ogrlici, ne 3D render),
  // samo ih ubaci u /public/images/gallery/ pod ovim imenima (1.jpg, 2.jpg, 3.jpg)
  // — automatski će zameniti placeholder ispod, bez izmene koda.
  const realPhotos = [
    { src: "/images/gallery/1.jpg", caption: c.photo1 },
    { src: "/images/gallery/2.jpg", caption: c.photo2 },
    { src: "/images/gallery/3.jpg", caption: c.photo3 },
  ];

  return (
    <div>
      <h3 className="gallerySectionTitle">{t.galleryOptionsTitle}</h3>
      <p className="gallerySectionNote">{t.galleryOptionsNote}</p>
      <ImageGrid items={options} featured />

      <h3 className="gallerySectionTitle" style={{ marginTop: 44 }}>{t.galleryRealTitle}</h3>
      <ImageGrid items={realPhotos} />
    </div>
  );
}
