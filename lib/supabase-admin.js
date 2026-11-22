import { createClient } from "@supabase/supabase-js";

// Servisni klijent — pun pristup bazi (zaobilazi RLS). Koristi SAMO na serveru
// (route handleri, admin stranice), NIKAD u kodu koji ide u browser.
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// Lista email adresa kojima je dozvoljen pristup admin panelu.
// Dodaj svoj email u Vercel env promenljivu ADMIN_EMAILS (odvojene zarezom).
export function isAdminEmail(email) {
  const allowed = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return !!email && allowed.includes(email.toLowerCase());
}
