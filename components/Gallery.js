"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import PhotoCarousel from "@/components/PhotoCarousel";
import SpinCard from "@/components/SpinCard";

export default function Gallery() {
  const { t } = useI18n();
  const c = t.galleryCaptions;

  // Kad dobiješ PRAVE fotografije (privezak stvarno na ogrlici, ne 3D render),
  // samo ih ubaci u /public/images/gallery/ pod ovim imenima (1.jpg, 2.jpg, 3.jpg)
  // — automatski će zameniti placeholder, bez izmene koda.
  const realPhotos = [
    { src: "/images/gallery/1.jpg", caption: c.photo1 },
    { src: "/images/gallery/2.jpg", caption: c.photo2 },
    { src: "/images/gallery/3.jpg", caption: c.photo3 },
  ];

  // Prave 3D renderovane slike opcija — deo su projekta (public/images/options/).
  const options = [
    { src: "/images/options/ring-with-name.png", caption: c.ringWithName },
    { src: "/images/options/ring-no-name.png", caption: c.ringNoName },
    { src: "/images/options/strap-with-name.png", caption: c.strapWithName },
    { src: "/images/options/strap-no-name.png", caption: c.strapNoName },
  ];

  return (
    <div>
      <PhotoCarousel items={realPhotos} />

      <h3 className="gallerySectionTitle" style={{ marginTop: 48 }}>{t.galleryOptionsTitle}</h3>
      <p className="gallerySectionNote">{t.galleryOptionsNote}</p>
      <div className="spinGrid">
        {options.map((o, i) => (
          <SpinCard key={i} src={o.src} caption={o.caption} />
        ))}
      </div>
    </div>
  );
}
