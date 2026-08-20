import { CONTACT_EMAIL } from "@/lib/config";

export default function Terms() {
  return (
    <div>
      <div className="nav"><a className="brand" href="/"><span className="dot" /> Vrati Me Kući</a></div>
      <div className="panel" style={{ marginTop: 28 }}>
        <div className="panelhead"><h2>Uslovi korišćenja</h2></div>
        <div style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.7, fontSize: 14.5 }}>
          <p><em>Ovo je predložak — zameni ga finalnim tekstom pre nego što sajt pusti u pravi rad.</em></p>
          <p>Kreiranje digitalnog profila ljubimca je besplatno. Fizički privezak se naplaćuje po
          trenutno važećoj ceni prikazanoj na sajtu, uz troškove dostave, i plaća se pouzećem prilikom
          preuzimanja pošiljke.</p>
          <p>Zadržavamo pravo da odbijemo narudžbinu u slučaju netačnih ili nepotpunih podataka za dostavu.
          Rok isporuke zavisi od kurirske službe i obično traje nekoliko radnih dana.</p>
          <p>Za pitanja, piši na <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </div>
    </div>
  );
}
