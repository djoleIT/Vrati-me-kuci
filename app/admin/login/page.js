"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError("");
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Pogrešan email ili lozinka.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="authbox">
      <div className="panelhead"><h2>Admin prijava</h2></div>
      <div className="field">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
      </div>
      <div className="field">
        <label>Lozinka</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"
          onKeyDown={(e) => e.key === "Enter" && login()} />
      </div>
      {error && <div className="error">{error}</div>}
      <button className="primary" onClick={login} disabled={loading} style={{ width: "100%", justifyContent: "center" }}>
        {loading ? "..." : "Prijavi se"}
      </button>
    </div>
  );
}
