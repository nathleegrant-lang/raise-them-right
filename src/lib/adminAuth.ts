import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "./supabaseAdmin";

export const ADMIN_ACCESS_COOKIE = "rtr_admin_access_token";

function createAuthClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}

export async function isAuthorizedAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("admin_authorizations")
    .select("user_id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .eq("is_active", true)
    .maybeSingle();

  return !error && Boolean(data);
}

export async function requireAdmin() {
  const token = cookies().get(ADMIN_ACCESS_COOKIE)?.value;

  if (!token) {
    redirect("/admin-login");
  }

  const supabase = createAuthClient();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user || !(await isAuthorizedAdmin(data.user.id))) {
    redirect("/admin-login");
  }

  return data.user;
}
