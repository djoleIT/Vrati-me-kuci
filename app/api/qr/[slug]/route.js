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

  const qrSvg = await QRCode.toString(url, {
    type: "svg",
    margin: 0,
    errorCorrectionLevel: "H",
    color: { dark: "#000000", light: "#0000" },
  });

  // Uzmi ISKLJUČIVO crne path-ove QR koda — bez pozadinskog pravougaonika,
  // okvira, teksta ili ijednog <rect>/<text> elementa, čak i ako ih biblioteka doda sama.
  const darkPaths = (qrSvg.match(/<path[^>]*fill="#000000"[^>]*\/>/gi) || []).join("");
  const qrViewBoxMatch = qrSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const qrSize = qrViewBoxMatch ? parseInt(qrViewBoxMatch[1], 10) : 100;

  const safeName = String(pet.pet_name).replace(/[^a-zA-Z0-9]/g, "");

  const combined = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${qrSize} ${qrSize}">${darkPaths}</svg>`;

  return new NextResponse(combined, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `attachment; filename="${slug}-${safeName || "privezak"}.svg"`,
    },
  });
}
