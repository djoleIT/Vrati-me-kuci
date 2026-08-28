"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";
import Faq from "@/components/Faq";

export default function FaqPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="pagesection"><h1>{t.faqTitle}</h1></div>
      <div className="panel">
        <Faq />
      </div>
    </div>
  );
}
