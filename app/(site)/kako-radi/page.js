import KakoRadiClient from "./KakoRadiClient";

export const metadata = {
  title: "Kako radi QR privezak za izgubljene ljubimce | Vrati Me Kući",
  description:
    "Skeniranjem QR koda na ogrlici, nalazač odmah vidi kontakt vlasnika i može da pozove. Pogledaj kako izgleda stranica posle skeniranja.",
};

export default function Page() {
  return <KakoRadiClient />;
}
