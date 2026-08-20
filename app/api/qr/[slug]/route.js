import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(req, { params }) {
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const { slug } = await params;
  const db = supabaseAdmin();
  const { data: pet } = await db.from("pets").select("pet_name").eq("slug", slug).single();
  if (!pet) return NextResponse.json({ error: "Nije pronađeno" }, { status: 404 });

  const origin = req.nextUrl.origin;
  const url = `${origin}/p/${slug}`;

  const qrSvg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "H",
    color: { dark: "#000000", light: "#ffffff" },
  });

  // Izvuci samo unutrašnji sadržaj generisanog QR SVG-a (bez spoljašnjeg <svg> taga)
  const inner = qrSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const qrViewBoxMatch = qrSvg.match(/viewBox="0 0 (\d+) (\d+)"/);
  const qrSize = qrViewBoxMatch ? parseInt(qrViewBoxMatch[1], 10) : 100;

  const padding = qrSize * 0.12;
  const textHeight = qrSize * 0.22;
  const totalW = qrSize + padding * 2;
  const totalH = qrSize + padding * 2 + textHeight;

  const safeName = String(pet.pet_name).replace(/[<>&]/g, "");

  const combined = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}">
  <rect width="${totalW}" height="${totalH}" fill="#ffffff"/>
  <g transform="translate(${padding}, ${padding})">${inner}</g>
  <text x="${totalW / 2}" y="${qrSize + padding + textHeight * 0.65}" text-anchor="middle"
    font-family="Arial, sans-serif" font-weight="700" font-size="${textHeight * 0.5}" fill="#000000">${safeName}</text>
</svg>`;

  return new NextResponse(combined, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `attachment; filename="${slug}-${safeName || "privezak"}.svg"`,
    },
  });
}
