import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { supabaseAdmin, isAdminEmail } from "@/lib/supabase-admin";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(req, { params }) {
  // Samo prijavljeni admin sme da preuzme SVG (isti spisak email adresa kao middleware)
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!isAdminEmail(user?.email)) {
    return NextResponse.json({ error: "Nije dozvoljeno" }, { status: 403 });
  }

  const { slug } = await params;
  const db = supabaseAdmin();
  const { data: pet } = await db.from("pets").select("pet_name").eq("slug", slug).single();
  if (!pet) return NextResponse.json({ error: "Nije pronađeno" }, { status: 404 });

  const origin = req.nextUrl.origin;
  // Bez "https://" u samom QR sadržaju — kraći tekst znači manje kockica.
  // Skoro svi skeneri (iPhone kamera, Android kamera, Google Lens) prepoznaju
  // ovakav tekst kao link i nude "otvori u browseru" isto kao i sa https://.
  const bareUrl = `${origin.replace(/^https?:\/\//, "")}/p/${slug}`;

  // Nivo ispravke grešaka "L" (najniži, ~7%) — najmanji mogući broj kockica
  // za dati sadržaj. Za kratak link kao ovaj to je i dalje više nego dovoljno
  // pouzdano za skeniranje, a znatno je jednostavnije za 3D štampu.
  const qr = QRCode.create(bareUrl, { errorCorrectionLevel: "L" });
  const size = qr.modules.size;
  const get = (row, col) => qr.modules.get(row, col);

  let d = "";
  for (let row = 0; row < size; row++) {
    let col = 0;
    while (col < size) {
      if (get(row, col)) {
        const runStart = col;
        while (col < size && get(row, col)) col++;
        const runLen = col - runStart;
        d += `M${runStart} ${row}h${runLen}v1h${-runLen}z`;
      } else {
        col++;
      }
    }
  }

  const safeName = String(pet.pet_name).replace(/[^a-zA-Z0-9]/g, "");

  // Čist SVG: jedan <path>, bez <rect>, bez <image>, bez teksta.
  const combined = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><path d="${d}"/></svg>`;

  return new NextResponse(combined, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `attachment; filename="${slug}-${safeName || "privezak"}.svg"`,
    },
  });
}
