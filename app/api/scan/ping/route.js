import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail, belgradeTime } from "@/lib/notify";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const OK = () => NextResponse.json({ ok: true });

// Poziva se iz skenirane stranice čim se otvori. Šalje vlasniku mejl "neko je skenirao"
// (samo ako je vlasnik uključio obaveštenja), najviše jedan na 10 minuta po ljubimcu.
export async function POST(req) {
  const { scanId } = await req.json().catch(() => ({}));
  if (!UUID.test(scanId || "")) return NextResponse.json({ ok: false }, { status: 400 });

  const db = supabaseAdmin();
  const { data: scan } = await db
    .from("scan_events").select("id, pet_id, created_at, notified_at").eq("id", scanId).maybeSingle();
  if (!scan || scan.notified_at) return OK();
  if (Date.now() - new Date(scan.created_at).getTime() > 2 * 3600 * 1000) return OK();

  const { data: pet } = await db
    .from("pets").select("pet_name, notify_scan, notify_email").eq("id", scan.pet_id).maybeSingle();
  if (!pet?.notify_scan || !pet.notify_email) return OK();

  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await db
    .from("scan_events").select("id", { count: "exact", head: true })
    .eq("pet_id", scan.pet_id).gt("notified_at", since);
  if (count > 0) return OK();

  await db.from("scan_events").update({ notified_at: new Date().toISOString() }).eq("id", scanId);
  await sendEmail({
    to: pet.notify_email,
    subject: `Neko je skenirao privezak: ${pet.pet_name}`,
    text:
      `Neko je upravo skenirao QR privezak tvog ljubimca ${pet.pet_name} (${belgradeTime()}).\n\n` +
      `Ako osoba odluči da podeli svoju lokaciju, dobićeš još jedan mejl sa tačkom na mapi.\n\n` +
      `Ako je ljubimac stvarno izgubljen, obrati pažnju na telefon — nalazač te možda upravo zove.\n\n` +
      `— Vrati Me Kući`,
  });
  return OK();
}
