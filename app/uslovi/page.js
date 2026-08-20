import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";

export const metadata = { title: "Uslovi korišćenja — Vrati Me Kući" };

export default function Terms() {
  return (
    <div>
      <SiteHeader compact />
      <article className="panel legal">
        <h1>Uslovi korišćenja</h1>
        <p>
          Vrati Me Kući je servis za naručivanje QR priveska i javnog profila ljubimca. Porudžbinom
          potvrđujete da su podaci tačni i da imate pravo da ih navedete.
        </p>
        <h2>Porudžbina i plaćanje</h2>
        <p>
          Plaćanje je pouzećem. Promo cena priveska je {SITE.pricePromo} din, redovna{" "}
          {SITE.priceRegular} din. Dostava je {SITE.shipping} din, osim ako nije drugačije dogovoreno.
        </p>
        <h2>Profil</h2>
        <p>
          QR kod vodi na javnu stranicu. Ti biraš šta je vidljivo. Ulica se ne prikazuje nalazaču.
        </p>
        <h2>Kontakt</h2>
        <p>
          Pitanja: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>
      </article>
      <SiteFooter />
    </div>
  );
}
