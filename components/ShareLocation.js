"use client";
import React, { useEffect, useRef, useState } from "react";

// Prikazuje se na skeniranoj stranici SAMO ako je vlasnik uključio obaveštenja.
// 1) Čim se stranica otvori, javlja serveru da je skenirano (vlasnik dobija mejl).
// 2) Nudi dugme "Pošalji lokaciju" — GPS se čita tek kad osoba pritisne dugme i dozvoli
//    to u svom telefonu (browser to uvek traži; ne može se uzeti bez dozvole).
export default function ShareLocation({ scanId, offerLocation }) {
  const [state, setState] = useState("idle"); // idle | asking | sent | denied | error
  const pinged = useRef(false);

  useEffect(() => {
    if (!scanId || pinged.current) return;
    pinged.current = true;
    fetch("/api/scan/ping", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scanId }),
    }).catch(() => {});
  }, [scanId]);

  if (!offerLocation || !scanId) return null;
  const supported = typeof navigator !== "undefined" && !!navigator.geolocation;
  if (!supported) return null;

  function share() {
    setState("asking");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch("/api/scan/location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              scanId,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              accuracy: pos.coords.accuracy,
            }),
          });
          setState(res.ok ? "sent" : "error");
        } catch {
          setState("error");
        }
      },
      (err) => setState(err.code === 1 ? "denied" : "error"),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  return (
    <div className="shareLoc">
      {state === "sent" ? (
        <p className="shareLocOk">✓ Lokacija je poslata vlasniku. Hvala što pomažeš!</p>
      ) : (
        <>
          <p className="shareLocText">
            <strong>Pomozi da ljubimac stigne kući.</strong> Pošalji vlasniku svoju trenutnu lokaciju.
            Telefon će te pitati za dozvolu — lokacija ide samo vlasniku.
          </p>
          <button type="button" className="shareLocBtn" onClick={share} disabled={state === "asking"}>
            {state === "asking" ? "Određujem lokaciju…" : "📍 Pošalji lokaciju vlasniku"}
          </button>
          {state === "denied" && <p className="shareLocErr">Nema problema — lokacija nije poslata. Možeš da pozoveš vlasnika dugmetom iznad.</p>}
          {state === "error" && <p className="shareLocErr">Nije uspelo da se odredi ili pošalje lokacija. Pokušaj ponovo ili pozovi vlasnika.</p>}
        </>
      )}
    </div>
  );
}
