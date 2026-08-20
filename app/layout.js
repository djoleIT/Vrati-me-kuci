import { LanguageProvider } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata = {
  title: "Vrati Me Kući — QR privezak za ljubimce",
  description:
    "3D štampan QR privezak i profil ljubimca. Ako se izgubi, nalazač skenira kod i odmah zove vlasnika. Plaćanje pouzećem.",
  metadataBase: new URL(`https://${SITE.domain}`),
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
