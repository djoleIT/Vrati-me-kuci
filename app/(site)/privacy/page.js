import { CONTACT_EMAIL } from "@/lib/config";

export default function Privacy() {
  return (
    <div className="panel" style={{ marginTop: 28 }}>
      <div className="panelhead"><h2>Politika privatnosti</h2></div>
      <div className="legaltext">
        <p><strong>Poslednja izmena:</strong> {new Date().toLocaleDateString("sr-RS")}</p>

        <h3>Koje podatke prikupljamo</h3>
        <p>Kada napraviš profil ljubimca, od tebe tražimo: ime ljubimca, tvoje ime, jedan ili dva
        telefonska broja, adresu za dostavu (ulica, grad, opština, poštanski broj, država) i, ako želiš,
        napomene o zdravlju ili alergijama ljubimca. Sve što uneseš ostaje isključivo u svrhe navedene
        ispod — ne prikupljamo ništa drugo, ne pratimo te po sajtu, i ne koristimo kolačiće za reklame.</p>

        <h3>Zašto prikupljamo ove podatke</h3>
        <ul>
          <li>Da napravimo tvoj jedinstveni QR profil i fizički privezak</li>
          <li>Da pošaljemo privezak na tvoju adresu putem kurirske službe</li>
          <li>Da te kontaktiramo u vezi sa narudžbinom (email ili SMS)</li>
          <li>Da prikažemo, na javnoj stranici koju vidi neko ko skenira QR kod, samo ono što ti sam
          izabereš da bude vidljivo</li>
        </ul>

        <h3>Šta je javno vidljivo</h3>
        <p>Prilikom kreiranja profila, ti biraš tačno koji podaci se prikazuju posle skeniranja
        (npr. primarni telefon, napomene o zdravlju). Kućna adresa se NIKAD ne prikazuje javno,
        osim ako to eksplicitno ne uključiš. Ako izabereš opciju „ljubimac nije izgubljen, samo
        slobodno šeta", javna stranica uopšte ne prikazuje tvoj broj telefona — samo umirujuću poruku.</p>

        <h3>Ko ima pristup podacima</h3>
        <p>Tvojim punim podacima (adresa, oba telefona, email) pristup ima isključivo administrator
        sajta, radi obrade i slanja narudžbine. Adresu i telefon za dostavu prosleđujemo kurirskoj
        službi isključivo radi isporuke priveska. Podatke ne prodajemo i ne delimo ni sa kim drugim.</p>

        <h3>Kolačići i lokalno čuvanje</h3>
        <p>Sajt čuva samo tvoju izabranu jezičku postavku u lokalnoj memoriji browsera
        (localStorage), radi udobnosti. Ne koristimo kolačiće za praćenje, analitiku trećih strana
        niti oglašavanje.</p>

        <h3>Koliko dugo čuvamo podatke</h3>
        <p>Podatke čuvamo dok god profil postoji i privezak je u upotrebi. Ako želiš da obrišemo
        tvoj profil i sve povezane podatke, javi nam se na kontakt ispod — brišemo ih u razumnom roku.</p>

        <h3>Tvoja prava</h3>
        <p>U svakom trenutku možeš da zatražiš uvid u podatke koje čuvamo o tebi, njihovu izmenu
        (npr. promenu broja telefona) ili potpuno brisanje. Piši nam na email ispod.</p>

        <h3>Kontakt</h3>
        <p>Za sva pitanja u vezi sa privatnošću, piši na{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>.</p>
      </div>
    </div>
  );
}
