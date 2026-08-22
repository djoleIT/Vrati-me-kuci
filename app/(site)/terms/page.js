import { CONTACT_EMAIL, REGULAR_PRICE, PROMO_PRICE, ENGRAVED_PRICE } from "@/lib/config";

export const metadata = {
  title: "Uslovi korišćenja | Vrati Me Kući",
  description: "Uslovi narudžbine, cena, plaćanja i isporuke QR priveska za ljubimce.",
};

export default function Terms() {
  return (
    <div className="panel" style={{ marginTop: 28 }}>
      <div className="panelhead"><h2>Uslovi korišćenja</h2></div>
      <div className="legaltext">
        <p><strong>Poslednja izmena:</strong> {new Date().toLocaleDateString("sr-RS")}</p>

        <h3>Šta nudimo</h3>
        <p>Kreiranje digitalnog profila ljubimca (ime, kontakt, napomene) i generisanje jedinstvenog
        QR koda je potpuno besplatno i ostaje besplatno zauvek — nema mesečne pretplate niti
        skrivenih troškova. Fizički privezak (standardni ili gravirani) se naručuje i plaća posebno.</p>

        <h3>Cena i plaćanje</h3>
        <p>Standardni privezak trenutno košta {PROMO_PRICE} din (redovna cena {REGULAR_PRICE} din),
        a gravirani privezak {ENGRAVED_PRICE} din. Cene mogu biti izmenjene u budućnosti — cena koja
        važi je uvek ona prikazana na sajtu u trenutku narudžbine. Plaćanje je isključivo pouzećem:
        naplatu vrši kurirska služba prilikom uručenja pošiljke. Ne tražimo niti čuvamo podatke
        platnih kartica na sajtu.</p>

        <h3>Personalizacija i pravo na odustanak</h3>
        <p>Svaki privezak se izrađuje pojedinačno, po meri, sa jedinstvenim QR kodom i imenom
        ljubimca koje si sam uneo — reč je o proizvodu personalizovanom po tvojoj specifikaciji.
        U skladu sa Zakonom o zaštiti potrošača, ovakva roba izrađena po posebnom zahtevu
        potrošača po pravilu je izuzeta od standardnog 14-dnevnog prava na odustanak od
        ugovora na daljinu koje važi za standardnu, neličnu robu. Ako je proizvod stigao oštećen
        ili pogrešan, javi nam se — u tom slučaju rešavamo reklamaciju besplatnom zamenom ili
        popravkom.</p>

        <h3>Isporuka</h3>
        <p>Privezak šaljemo na adresu koju uneseš prilikom narudžbine, putem kurirske službe.
        Rok isporuke zavisi od kurira i obično traje nekoliko radnih dana od trenutka slanja u
        štampu. Zadržavamo pravo da odbijemo ili odložimo narudžbinu ako su podaci za dostavu
        netačni ili nepotpuni — u tom slučaju te kontaktiramo radi ispravke.</p>

        <h3>Odgovornost</h3>
        <p>Trudimo se da QR kod i javna stranica rade besprekorno, ali ne možemo garantovati
        neprekidnu dostupnost interneta ili hostinga. Nismo odgovorni za štetu nastalu usled
        privremene nedostupnosti sajta niti za netačne podatke koje si sam uneo prilikom
        kreiranja profila.</p>

        <h3>Izmena uslova</h3>
        <p>Ovi uslovi mogu biti povremeno ažurirani. Nastavak korišćenja sajta posle izmene
        smatra se prihvatanjem novih uslova.</p>

        <h3>Kontakt</h3>
        <p>Za sva pitanja, piši na{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>.</p>

        <p style={{ marginTop: 24, fontSize: 12.5, opacity: 0.55 }}>
          Napomena: ovaj tekst je pripremljen kao solidna polazna osnova, ali nije zamena za
          pravni savet — preporučujemo da ga pre punog komercijalnog lansiranja pregleda advokat,
          naročito deo o pravu na odustanak.
        </p>
      </div>
    </div>
  );
}
