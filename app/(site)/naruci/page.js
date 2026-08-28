import { Suspense } from "react";
import OrderClient from "./OrderClient";

export const metadata = {
  title: "Poruči QR privezak za ljubimca | Vrati Me Kući",
  description:
    "Napravi besplatan profil svog psa ili mačke i poruči QR privezak sa 3D štampom. Plaćanje isključivo pouzećem, bez mesečne pretplate.",
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <OrderClient />
    </Suspense>
  );
}
