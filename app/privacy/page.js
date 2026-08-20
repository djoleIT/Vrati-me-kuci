import { CONTACT_EMAIL } from "@/lib/config";

export default function Privacy() {
  return (
    <div>
      <div className="nav"><a className="brand" href="/"><span className="dot" /> Vrati Me Kući</a></div>
      <div className="panel" style={{ marginTop: 28 }}>
        <div className="panelhead"><h2>Politika privatnosti</h2></div>
        <div style={{ color: "rgba(243,238,226,0.75)", lineHeight: 1.7, fontSize: 14.5 }}>
          <p><em>Ovo je predložak — zameni ga finalnim tekstom pre nego što sajt pusti u pravi rad.</em></p>
          <p>Prikupljamo podatke koje nam sam daš prilikom kreiranja profila ljubimca: ime ljubimca,
          tvoje kontakt podatke i adresu za dostavu. Ove podatke koristimo isključivo za:</p>
          <ul>
            <li>prikaz na javnoj QR stranici — samo ono što eksplicitno izabereš da bude vidljivo,</li>
            <li>slanje fizičkog priveska na tvoju adresu,</li>
            <li>kontaktiranje u vezi sa narudžbinom.</li>
          </ul>
          <p>Kućna adresa se ne prikazuje javno osim ako to sam ne uključiš. Podatke ne prodajemo niti
          delimo sa trećim stranama van kurirske službe koja isporučuje privezak.</p>
          <p>Za pitanja ili zahtev za brisanje podataka, piši na <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "var(--brass)" }}>{CONTACT_EMAIL}</a>.</p>
        </div>
      </div>
    </div>
  );
}
