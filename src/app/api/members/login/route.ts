import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  );

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session || !data.user) {
    return NextResponse.json({ error: "Invalid email or password, or your email has not yet been confirmed." }, { status: 401 });
  }

  const { data: account, error: accountError } = await supabaseAdmin
    .from("member_accounts")
    .select("account_type, account_status, adult_confirmed")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (accountError || !account || !account.adult_confirmed) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "This account is not registered as a #RaiseThemRight community member." }, { status: 403 });
  }

  if (account.account_status === "suspended" || account.account_status === "closed") {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "This community account is not currently available for sign-in." }, { status: 403 });
  }

  if (account.account_type !== "parent" && account.account_type !== "community_partner") {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "This account does not have a valid community role." }, { status: 403 });
  }

  const destination = account.account_type === "parent" ? "/parent/onboarding" : "/community-partner/onboarding";
  const response = NextResponse.json({ ok: true, destination, accountType: account.account_type });

  response.cookies.set(MEMBER_ACCESS_COOKIE, data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: data.session.expires_in ?? 3600,
  });

  return response;
}
