import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE, isAuthorizedAdmin } from "../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

async function requireAdminRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;
  if (!token) return null;
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user || !(await isAuthorizedAdmin(data.user.id))) return null;
  return data.user;
}

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
  const admin = await requireAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid review request." }, { status: 400 }); }
  const decision = body.decision === "verified" ? "verified" : body.decision === "declined" ? "declined" : null;
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 500) : "";
  if (!decision) return NextResponse.json({ error: "Choose approve or decline." }, { status: 400 });

  const { data: profile, error: loadError } = await supabaseAdmin.from("community_partner_profiles").select("verification_status").eq("user_id", params.userId).maybeSingle();
  if (loadError || !profile) return NextResponse.json({ error: "Community Partner profile not found." }, { status: 404 });
  if (profile.verification_status !== "pending") return NextResponse.json({ error: "Only pending verification requests can be reviewed." }, { status: 409 });

  const { error } = await supabaseAdmin.from("community_partner_profiles").update({ verification_status: decision, verification_reviewed_at: new Date().toISOString(), verification_reviewed_by: admin.id, verification_note: note || null, updated_at: new Date().toISOString() }).eq("user_id", params.userId).eq("verification_status", "pending");
  if (error) return NextResponse.json({ error: "Unable to save verification decision." }, { status: 500 });
  return NextResponse.json({ ok: true, status: decision });
}
