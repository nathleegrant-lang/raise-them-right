import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE, isAuthorizedAdmin } from "../../../../lib/adminAuth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const supabase = createClient(
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

  const { data, error } = await supabase.auth.signInWithPassword({
    email: String(email),
    password: String(password),
  });

  if (error || !data.session || !data.user) {
    return NextResponse.json({ error: "Invalid login." }, { status: 401 });
  }

  if (!(await isAuthorizedAdmin(data.user.id))) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "This account is not authorized for Mission Control." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_ACCESS_COOKIE, data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: data.session.expires_in ?? 3600,
  });

  return response;
}
