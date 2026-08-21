"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL, SMS_CONTACT } from "@/lib/config";

export default function KontaktPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="pagesection"><h1>{t.navContact}</h1></div>
      <div className="panel">
        <p style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.7, marginBottom: 24 }}>
          Imaš pitanje o narudžbini, dostavi, ili želiš da promeniš podatke na svom profilu?
          Javi nam se — odgovaramo brzo.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a className="ghost" href={`mailto:${CONTACT_EMAIL}`} style={{ textDecoration: "none" }}>
            ✉ {CONTACT_EMAIL}
          </a>
          <a className="ghost" href={`sms:${SMS_CONTACT.replace(/\s/g, "")}`} style={{ textDecoration: "none" }}>
            💬 SMS: {SMS_CONTACT}
          </a>
        </div>
      </div>
    </div>
  );
}
