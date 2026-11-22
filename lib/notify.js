// Slanje mejla preko Resend-a (https://resend.com). Ako nisu postavljene
// promenljive RESEND_API_KEY i NOTIFY_FROM, ne radi ništa (sajt i dalje radi normalno).
// Opciono: ADMIN_NOTIFY_EMAIL — dobija skrivenu kopiju svakog obaveštenja (BCC).
export async function sendEmail({ to, subject, text }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFY_FROM;
  if (!key || !from) return { ok: false, skipped: true };
  const bcc = process.env.ADMIN_NOTIFY_EMAIL ? [process.env.ADMIN_NOTIFY_EMAIL] : undefined;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], bcc, subject, text }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

export function mapsLink(lat, lng) {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export function belgradeTime(date = new Date()) {
  return date.toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" });
}
