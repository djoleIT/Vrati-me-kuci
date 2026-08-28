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
  const url = `${origin}/p/${slug}`;

  // Generišemo sirovu QR matricu (ne SVG string) da bismo ručno spojili
  // susedne tamne kockice u redovima u JEDAN jedinstveni <path> —
  // bez pojedinačnih <rect> elemenata i bez suvišnih/preklopljenih ivica
  // između susednih kockica. Ovo je bitno da OpenSCAD (i drugi 3D alati)
  // dobiju čistu, manifold geometriju za extrude/uvoz.
  // Nivo ispravke grešaka "M" (srednji, ~15%) — isto što koristi većina
  // običnih QR generatora po difoltu. "H" (najviši, ~30%) nepotrebno
  // duplira broj kockica za isti link, što ga čini komplikovanijim i
  // težim za 3D štampu bez ikakve stvarne koristi za ovu namenu.
  const qr = QRCode.create(url, { errorCorrectionLevel: "M" });
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
