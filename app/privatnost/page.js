import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

export const metadata = { title: "Privatnost — Vrati Me Kući" };

export default function Privacy() {
  return (
    <div>
      <SiteHeader compact />
      <article className="panel legal">
        <h1>Privatnost</h1>
        <p>
          Čuvamo podatke ljubimca, vlasnika i adresu dostave da bismo napravili privezak, poslali
          paket i prikazali profil koji ti odobriš.
        </p>
        <h2>Šta je javno</h2>
        <p>
          Posle skeniranja vidi se ime ljubimca i polja koja uključiš (telefon, napomene, grad).
          Puna adresa je samo za dostavu i admin panel, nije na javnoj stranici.
        </p>
        <h2>Koliko čuvamo</h2>
        <p>
          Profil ostaje aktivan dok je privezak u upotrebi. Za brisanje ili izmenu piši na{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
        </p>
        <h2>Plaćanje</h2>
        <p>Na sajtu ne prikupljamo podatke o platnim karticama. Plaćanje ide kuriru, pouzećem.</p>
      </article>
      <SiteFooter />
    </div>
  );
}
