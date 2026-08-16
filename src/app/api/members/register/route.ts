import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const ALLOWED_ACCOUNT_TYPES = new Set(["parent", "community_partner"]);

function cleanText(value: unknown, maxLength = 120) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid registration request." }, { status: 400 });
  }

  const email = cleanText(body.email, 254).toLowerCase();
  const password = typeof body.password === "string" ? body.password : "";
  const firstName = cleanText(body.firstName, 80);
  const lastName = cleanText(body.lastName, 80);
  const country = cleanText(body.country, 100) || null;
  const parishState = cleanText(body.parishState, 100) || null;
  const accountType = cleanText(body.accountType, 40);
  const adultConfirmed = body.adultConfirmed === true;

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }

  if (!ALLOWED_ACCOUNT_TYPES.has(accountType)) {
    return NextResponse.json({ error: "Choose Parent or Community Partner." }, { status: 400 });
  }

  if (!adultConfirmed) {
    return NextResponse.json(
      { error: "#RaiseThemRight accounts are for adults only. You must confirm that you are an adult." },
      { status: 400 }
    );
  }

  const authClient = createClient(
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

  const { data: signUpData, error: signUpError } = await authClient.auth.signUp({
    email,
    password,
  });

  if (signUpError || !signUpData.user) {
    return NextResponse.json(
      { error: signUpError?.message || "Unable to create the account." },
      { status: 400 }
    );
  }

  const userId = signUpData.user.id;
  const { error: accountError } = await supabaseAdmin.from("member_accounts").insert({
    user_id: userId,
    account_type: accountType,
    account_status: "onboarding",
    first_name: firstName,
    last_name: lastName,
    display_name: firstName,
    country,
    parish_state: parishState,
    adult_confirmed: true,
  });

  if (accountError) {
    await supabaseAdmin.auth.admin.deleteUser(userId);
    return NextResponse.json(
      { error: "We could not finish creating your account. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    confirmationRequired: !signUpData.session,
    message: signUpData.session
      ? "Your account has been created."
      : "Your account has been created. Please check your email to confirm your address before signing in.",
  });
}
