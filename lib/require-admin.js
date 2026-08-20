import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/supabase-admin";
import { supabaseServer } from "@/lib/supabase-server";

export async function requireAdmin() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    return {
      user: null,
      error: NextResponse.json({ error: "Nije dozvoljeno" }, { status: 403 }),
    };
  }

  return { user, error: null };
}
