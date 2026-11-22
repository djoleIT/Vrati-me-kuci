import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

// PROMENI ako i kad dobiješ pravi domen — bitno za Google i za deljenje linkova.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vratimekuci.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vrati Me Kući — QR privezak za pse i mačke",
    template: "%s",
  },
  description:
    "Besplatan digitalni profil ljubimca i QR privezak koji nalazača odmah odvede na stranicu sa vašim kontaktom. 3D štampa, plaćanje pouzećem, bez pretplate.",
  keywords: [
    "QR privezak za pse", "QR privezak za mačke", "izgubljen pas", "izgubljena mačka",
    "privezak za ogrlicu", "identifikacija ljubimca", "pronađi ljubimca", "3D štampan privezak",
  ],
  openGraph: {
    title: "Vrati Me Kući — QR privezak za pse i mačke",
    description: "QR privezak koji nalazača odmah odvede na stranicu sa vašim kontaktom.",
    url: SITE_URL,
    siteName: "Vrati Me Kući",
    locale: "sr_RS",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
