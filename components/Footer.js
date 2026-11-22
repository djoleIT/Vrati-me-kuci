"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/config";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="sitefooter">
      <div className="footerlinks">
        <a href="/privacy">{t.footerPrivacy}</a>
        <a href="/terms">{t.footerTerms}</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <a href="/admin" className="footeradmin">Admin</a>
      </div>
      <p>© {new Date().getFullYear()} Vrati Me Kući</p>
    </footer>
  );
}
