"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/config";

export default function ContactSection() {
  const { t } = useI18n();
  return (
    <section>
      <div className="pagesection"><h1>{t.navContact}</h1></div>
      <div className="panel">
        <p style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.7, marginBottom: 24 }}>{t.contactIntro}</p>
        <a className="ghost" href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: "none" }}>✉ {CONTACT_EMAIL}</a>
      </div>
    </section>
  );
}
