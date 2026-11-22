"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n";

export default function StickyCta() {
  const pathname = usePathname();
  const { t } = useI18n();
  const [show, setShow] = useState(false);

  // Dugme se pojavljuje tek kad se skrolovanjem pređe početni deo stranice
  // (tamo već postoji glavno dugme "Poruči"), da ne stoje dva dugmeta jedno preko drugog.
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/naruci" || pathname.startsWith("/admin") || !show) return null;

  return (
    <Link href="/naruci" className="stickycta">
      {t.navOrder} →
    </Link>
  );
}
