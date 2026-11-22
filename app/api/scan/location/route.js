import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail, mapsLink, belgradeTime } from "@/lib/notify";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const bad = (msg, status = 400) => NextResponse.json({ ok: false, error: msg }, { status });

// Poziva se tek kad osoba koja skenira SAMA pritisne dugme i dozvoli lokaciju u telefonu.
// Lokacija se upisuje uz to skeniranje (jednom) i, ako je vlasnik uključio obaveštenja, šalje mu se mejl.
export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { scanId } = body;
  // Samo pravi brojevi — Number(null) i Number("") bi dali 0 i upisali lažnu lokaciju (0, 0).
  const lat = body.lat;
  const lng = body.lng;
  const acc = typeof body.accuracy === "number" ? Math.round(body.accuracy) : null;

  if (!UUID.test(scanId || "")) return bad("Neispravan zahtev");
  if (
    typeof lat !== "number" || typeof lng !== "number" ||
    !Number.isFinite(lat) || !Number.isFinite(lng) ||
    lat < -90 || lat > 90 || lng < -180 || lng > 180 ||
    (lat === 0 && lng === 0)
  ) {
    return bad("Neispravna lokacija");
  }
  const accuracy = Number.isFinite(acc) && acc >= 0 && acc <= 1000000 ? acc : null;

  const db = supabaseAdmin();
  const { data: scan } = await db
    .from("scan_events").select("id, pet_id, created_at").eq("id", scanId).maybeSingle();
  if (!scan) return bad("Skeniranje nije pronađeno", 404);
  if (Date.now() - new Date(scan.created_at).getTime() > 2 * 3600 * 1000) return bad("Isteklo", 410);

  // Jednom po skeniranju: upis uspeva samo dok lat još nije postavljen
  const { data: updated } = await db
    .from("scan_events")
    .update({ lat, lng, accuracy_m: accuracy, location_at: new Date().toISOString() })
    .eq("id", scanId).is("lat", null).select("id");
  if (!updated || updated.length === 0) return NextResponse.json({ ok: true, already: true });

  const { data: pet } = await db
    .from("pets").select("pet_name, notify_scan, notify_email").eq("id", scan.pet_id).maybeSingle();
  if (pet?.notify_scan && pet.notify_email) {
    await sendEmail({
      to: pet.notify_email,
      subject: `Lokacija: neko je pronašao ${pet.pet_name}`,
      text:
        `Osoba koja je skenirala privezak tvog ljubimca ${pet.pet_name} podelila je svoju lokaciju (${belgradeTime()}).\n\n` +
        `Mesto na mapi: ${mapsLink(lat, lng)}\n` +
        (accuracy != null ? `Tačnost lokacije: oko ${accuracy} m\n` : "") +
        `\nOvo je lokacija telefona osobe koja skenira, ne nužno i samog ljubimca. Pozovi je ili idi na to mesto.\n\n— Vrati Me Kući`,
    });
  }
  return NextResponse.json({ ok: true });
}
