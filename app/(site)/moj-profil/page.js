import { supabaseServer } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import OwnerLogin from "@/components/OwnerLogin";
import OwnerDashboard from "@/components/OwnerDashboard";
import AuthListener from "@/components/AuthListener";

export const dynamic = "force-dynamic";

export default async function MojProfil() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <AuthListener />
        <OwnerLogin />
      </>
    );
  }

  const db = supabaseAdmin();

  // "Prisvajanje" — profili se prave anonimno u trenutku narudžbine, bez naloga.
  // Kad se vlasnik prvi put uloguje, povežemo mu sve profile čiji je email za
  // kontakt (unet prilikom narudžbine) isti kao email kojim se upravo prijavio.
  const { data: addresses } = await db
    .from("owner_addresses")
    .select("pet_id")
    .eq("contact_email", user.email);

  const unclaimedIds = (addresses || []).map((a) => a.pet_id);
  if (unclaimedIds.length) {
    await db.from("pets").update({ owner_user_id: user.id }).in("id", unclaimedIds).is("owner_user_id", null);
  }

  const { data: pets } = await db
    .from("pets")
    .select("*, owner_addresses(city, municipality, country)")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: false });

  const petIds = (pets || []).map((p) => p.id);
  const { data: scans } = petIds.length
    ? await db.from("scan_events").select("pet_id, created_at").in("pet_id", petIds)
    : { data: [] };

  const scanStats = {};
  for (const s of scans || []) {
    if (!scanStats[s.pet_id]) scanStats[s.pet_id] = { count: 0, last: null, history: [] };
    scanStats[s.pet_id].count += 1;
    scanStats[s.pet_id].history.push(s.created_at);
    if (!scanStats[s.pet_id].last || s.created_at > scanStats[s.pet_id].last) {
      scanStats[s.pet_id].last = s.created_at;
    }
  }

  return (
    <>
      <AuthListener />
      <OwnerDashboard email={user.email} pets={pets || []} scanStats={scanStats} />
    </>
  );
}
