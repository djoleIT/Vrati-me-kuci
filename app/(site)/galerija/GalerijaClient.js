"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import Gallery from "@/components/Gallery";

export default function GalerijaPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="pagesection"><h1>{t.galleryTitle}</h1></div>
      <div className="panel">
        <Gallery />
      </div>
    </div>
  );
}
