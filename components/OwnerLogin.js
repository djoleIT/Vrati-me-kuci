"use client";
import React, { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendLink() {
    setLoading(true);
    setError("");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.href : undefined },
    });
    setLoading(false);
    if (error) {
      setError("Nešto nije u redu — proveri email i pokušaj ponovo.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="authbox">
        <div className="panelhead"><h2>Proveri email</h2></div>
        <p style={{ fontSize: 14, color: "rgba(243,238,226,0.7)", lineHeight: 1.6 }}>
          Poslali smo link za prijavu na <strong>{email}</strong>. Klikni na njega da uđeš na svoj profil —
          nema potrebe za lozinkom.
        </p>
      </div>
    );
  }

  return (
    <div className="authbox">
      <div className="panelhead"><h2>Moj profil</h2></div>
      <p style={{ fontSize: 13.5, color: "rgba(243,238,226,0.6)", marginBottom: 18, lineHeight: 1.6 }}>
        Unesi email koji si ostavio prilikom narudžbine — poslaćemo ti link za prijavu, bez lozinke.
      </p>
      <div className="field">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
          onKeyDown={(e) => e.key === "Enter" && email && sendLink()} />
      </div>
      {error && <div className="error">{error}</div>}
      <button className="primary" onClick={sendLink} disabled={!email || loading} style={{ width: "100%", justifyContent: "center" }}>
        {loading ? "..." : "Pošalji link za prijavu"}
      </button>
    </div>
  );
}
