"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, LANGS } from "@/lib/i18n";

export default function Nav() {
  const { lang, setLang, t } = useI18n();
  const pathname = usePathname();

  const links = [
    { href: "/", label: t.navHome },
    { href: "/kako-radi", label: t.navHowItWorks },
    { href: "/galerija", label: t.navGallery },
    { href: "/faq", label: t.navFaq },
    { href: "/kontakt", label: t.navContact },
  ];

  return (
    <div className="nav">
      <Link className="brand" href="/">
        <img src="/logo.png" alt="Vrati Me Kući" className="brandlogo" />
        Vrati Me Kući
      </Link>
      <div className="navtabs">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`navtab ${pathname === l.href ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="navright">
        <Link className="navorder" href="/naruci">{t.navOrder}</Link>
        <select className="navlangselect" value={lang} onChange={(e) => setLang(e.target.value)}>
          {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
      </div>
    </div>
  );
}
