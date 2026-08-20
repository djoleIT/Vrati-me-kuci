import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata = {
  title: "Vrati Me Kući — QR privezak za ljubimce",
  description: "Besplatan digitalni profil ljubimca sa QR privezakom koji ga vraća kući.",
  openGraph: {
    title: "Vrati Me Kući — QR privezak za ljubimce",
    description: "Besplatan digitalni profil ljubimca sa QR privezakom koji ga vraća kući.",
    type: "website",
    locale: "sr_RS",
  },
};

export const viewport = {
  themeColor: "#101413",
  width: "device-width",
  initialScale: 1,
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
