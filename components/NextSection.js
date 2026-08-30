"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export default function NextSection() {
  const pathname = usePathname();
  const { t } = useI18n();

  const order = [
    { href: "/", label: t.navHome },
    { href: "/kako-radi", label: t.navHowItWorks },
    { href: "/galerija", label: t.navGallery },
    { href: "/faq", label: t.navFaq },
    { href: "/kontakt", label: t.navContact },
  ];

  const idx = order.findIndex((o) => o.href === pathname);
  if (idx === -1 || idx === order.length - 1) return null;

  const next = order[idx + 1];

  return (
    <div className="nextSectionWrap">
      <Link href={next.href} className="nextSectionLink">
        <span className="nextSectionArrow">↓</span>
        {next.label}
      </Link>
    </div>
  );
}
