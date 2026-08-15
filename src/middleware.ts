import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE } from "./lib/adminAuth";

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

  if (error || !data.user || data.user.app_metadata?.role !== "admin") {
    const response = NextResponse.redirect(new URL("/admin-login", request.url));
    response.cookies.delete(ADMIN_ACCESS_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
