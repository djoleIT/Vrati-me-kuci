"use client";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const PHOTOS = [
  { src: "/gallery/gallery-01.jpg", alt: "Pas sa QR privezkom" },
  { src: "/gallery/gallery-02.jpg", alt: "Štene sa privezkom" },
  { src: "/gallery/gallery-03.jpg", alt: "Detalj QR priveska" },
  { src: "/gallery/gallery-04.jpg", alt: "Mačka sa privezkom" },
];

export default function Gallery() {
  const { t } = useI18n();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % PHOTOS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const photo = PHOTOS[i];

  return (
    <section className="section" id="galerija">
      <div className="sectionhead">
        <h2>{t.galleryTitle}</h2>
        <p>{t.gallerySub}</p>
      </div>
      <div className="carousel">
        <button
          type="button"
          className="ghost carrow"
          aria-label="Prethodna"
          onClick={() => setI((n) => (n - 1 + PHOTOS.length) % PHOTOS.length)}
        >
          ←
        </button>
        <div className="slide">
          <img src={photo.src} alt={photo.alt} />
        </div>
        <button
          type="button"
          className="ghost carrow"
          aria-label="Sledeća"
          onClick={() => setI((n) => (n + 1) % PHOTOS.length)}
        >
          →
        </button>
      </div>
      <div className="dots">
        {PHOTOS.map((p, idx) => (
          <button
            key={p.src}
            type="button"
            className={`dotbtn ${idx === i ? "on" : ""}`}
            aria-label={`Slika ${idx + 1}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </section>
  );
}
