import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata = {
  title: "Vrati Me Kući — QR privezak za ljubimce",
  description: "Besplatan digitalni profil ljubimca sa QR privezakom koji ga vraća kući.",
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
