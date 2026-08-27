"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { COUNTRIES } from "@/lib/countries";
import { lettersOnly, digitsOnly } from "@/lib/validators";

export default function OwnerDashboard({ email, pets, scanStats }) {
  const router = useRouter();
  const [openId, setOpenId] = useState(null);

  async function logout() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  }

  if (!pets.length) {
    return (
      <div className="panel" style={{ marginTop: 28 }}>
        <div className="panelhead"><h2>Moj profil</h2></div>
        <p style={{ color: "rgba(243,238,226,0.7)" }}>
          Prijavljen si kao <strong>{email}</strong>, ali nijedan profil ljubimca nije povezan sa ovim emailom.
          Proveri da li si prilikom narudžbine uneo isti email, ili nam se javi da to ispravimo.
        </p>
        <button className="ghost" onClick={logout} style={{ marginTop: 14 }}>Odjava</button>
      </div>
    );
  }

  return (
    <div className="panel" style={{ marginTop: 28, maxWidth: 800 }}>
      <div className="panelhead" style={{ justifyContent: "space-between", display: "flex" }}>
        <h2>Moji ljubimci</h2>
        <button className="ghost" onClick={logout} style={{ padding: "8px 14px" }}>Odjava</button>
      </div>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          stat={scanStats[pet.id]}
          open={openId === pet.id}
          onToggle={() => setOpenId(openId === pet.id ? null : pet.id)}
        />
      ))}
    </div>
  );
}

function PetCard({ pet, stat, open, onToggle }) {
  const [form, setForm] = useState({
    petName: pet.pet_name,
    phone1Country: pet.phone1_country,
    phone1: pet.phone1,
    phone2Country: pet.phone2_country || "+381",
    phone2: pet.phone2 || "",
    notes: pet.notes || "",
    showPhone1: pet.show_phone1,
    showPhone2: pet.show_phone2,
    showNotes: pet.show_notes,
    pageMode: pet.page_mode,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/owner/update-pet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId: pet.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Greška");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ownerPetCard">
      <button className="ownerPetHead" onClick={onToggle}>
        <div>
          <strong>{pet.pet_name}</strong>
          <span className="ownerPetSlug"> — /p/{pet.slug}</span>
        </div>
        <div className="ownerPetStats">
          <span>{stat?.count || 0}× skenirano</span>
          {stat?.last && <span className="ownerPetLast">poslednje: {new Date(stat.last).toLocaleDateString("sr-RS")}</span>}
          <span className="faqchevron">{open ? "−" : "+"}</span>
        </div>
      </button>

      {open && (
        <div className="ownerPetBody">
          {stat?.history?.length > 0 && (
            <div className="scanHistory">
              <h4>Istorija skeniranja ({stat.count})</h4>
              <div className="scanHistoryList">
                {stat.history.slice().reverse().slice(0, 20).map((ts, i) => (
                  <div key={i} className="scanHistoryItem">{new Date(ts).toLocaleString("sr-RS")}</div>
                ))}
              </div>
            </div>
          )}

          <div className="grid2">
            <div className="field">
              <label>Ime ljubimca</label>
              <input value={form.petName} onChange={(e) => set("petName", lettersOnly(e.target.value))} />
            </div>
            <div className="field">
              <label>Primarni telefon</label>
              <div className="phonefield">
                <select value={form.phone1Country} onChange={(e) => set("phone1Country", e.target.value)}>
                  {COUNTRIES.map((c) => <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>)}
                </select>
                <input inputMode="numeric" value={form.phone1} onChange={(e) => set("phone1", digitsOnly(e.target.value))} />
              </div>
            </div>
            <div className="field">
              <label>Sekundarni telefon</label>
              <div className="phonefield">
                <select value={form.phone2Country} onChange={(e) => set("phone2Country", e.target.value)}>
                  {COUNTRIES.map((c) => <option key={c.code} value={c.dial}>{c.dial} {c.code}</option>)}
                </select>
                <input inputMode="numeric" value={form.phone2} onChange={(e) => set("phone2", digitsOnly(e.target.value))} />
              </div>
            </div>
            <div className="field">
              <label>Napomene</label>
              <input value={form.notes} onChange={(e) => set("notes", e.target.value)} />
            </div>
          </div>

          <div className="tagoptions">
            <button type="button" className={`tagoption ${form.pageMode === "contact" ? "selected" : ""}`} onClick={() => set("pageMode", "contact")}>
              <div className="tagoptionhead"><span>Kontakt uključen</span></div>
              <p>Nalazač odmah vidi dugme za poziv.</p>
            </button>
            <button type="button" className={`tagoption ${form.pageMode === "roaming" ? "selected" : ""}`} onClick={() => set("pageMode", "roaming")}>
              <div className="tagoptionhead"><span>Slobodno šeta</span></div>
              <p>Stranica samo umiruje nalazača, bez isticanja poziva.</p>
            </button>
          </div>

          {form.pageMode === "contact" && (
            <div className="privacy">
              <h4>Šta je vidljivo posle skeniranja</h4>
              <Toggle label="Primarni telefon" on={form.showPhone1} onClick={() => set("showPhone1", !form.showPhone1)} />
              <Toggle label="Sekundarni telefon" on={form.showPhone2} onClick={() => set("showPhone2", !form.showPhone2)} />
              <Toggle label="Napomene" on={form.showNotes} onClick={() => set("showNotes", !form.showNotes)} />
            </div>
          )}

          {error && <div className="error">{error}</div>}
          <button className="primary" onClick={save} disabled={saving}>
            {saving ? "..." : saved ? "Sačuvano ✓" : "Sačuvaj izmene"}
          </button>
        </div>
      )}
    </div>
  );
}

function Toggle({ label, on, onClick }) {
  return (
    <div className="togglerow">
      <span>{label}</span>
      <div className={`switch ${on ? "on" : ""}`} onClick={onClick}><div className="knob" /></div>
    </div>
  );
}
