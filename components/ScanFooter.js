export default function ScanFooter() {
  return (
    <div className="scanFooter">
      <img src="/logo.png" alt="Vrati Me Kući" className="scanFooterLogo" />
      <p>
        Napravljeno na <a href="/">vratimekuci.com</a>
      </p>
      <a href="/naruci" className="ghost scanFooterCta">
        🐾 I tvoj ljubimac zaslužuje ovo — napravi besplatan profil →
      </a>
    </div>
  );
}
