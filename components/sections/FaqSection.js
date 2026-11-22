"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import Faq from "@/components/Faq";

export default function FaqSection() {
  const { t } = useI18n();
  return (
    <section>
      <div className="pagesection"><h1>{t.faqTitle}</h1></div>
      <div className="panel"><Faq /></div>
    </section>
  );
}
