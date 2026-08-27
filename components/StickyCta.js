"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export default function StickyCta() {
  const pathname = usePathname();
  const { t } = useI18n();

  if (pathname === "/naruci" || pathname.startsWith("/admin")) return null;

  return (
    <Link href="/naruci" className="stickycta">
      {t.navOrder} →
    </Link>
  );
}
