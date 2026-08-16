import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_ACCESS_COOKIE = "rtr_admin_access_token";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
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

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    const response = NextResponse.redirect(new URL("/admin-login", request.url));
    response.cookies.delete(ADMIN_ACCESS_COOKIE);
    return response;
  }

  // Middleware verifies that the request has a valid Supabase session.
  // Server-rendered admin pages perform the authoritative administrator
  // authorization check against the protected admin_authorizations registry
  // before any privileged Mission Control data is read.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
