import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { ADMIN_ACCESS_COOKIE, isAuthorizedAdmin } from "../../../../../../../lib/adminAuth";
import { supabaseAdmin } from "../../../../../../../lib/supabaseAdmin";

const BUCKET = "verification-evidence";
const ALLOWED = new Set(["certified_id", "verification_photo", "reference_letter"]);

async function requireAdminRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_ACCESS_COOKIE)?.value;
  if (!token) return null;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } }
  );
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user || !(await isAuthorizedAdmin(data.user.id))) return null;
  return data.user;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; documentType: string } }
) {
  const admin = await requireAdminRequest(request);
  if (!admin) return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  if (!ALLOWED.has(params.documentType)) return NextResponse.json({ error: "Unsupported verification evidence type." }, { status: 400 });

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("community_partner_profiles")
    .select("verification_status")
    .eq("user_id", params.userId)
    .maybeSingle();
  if (profileError || !profile) return NextResponse.json({ error: "Community Partner profile not found." }, { status: 404 });
  if (profile.verification_status !== "pending") return NextResponse.json({ error: "Evidence review is available only for pending verification applications." }, { status: 409 });

  const { data: document, error } = await supabaseAdmin
    .from("community_partner_verification_documents")
    .select("storage_path,original_filename,mime_type")
    .eq("user_id", params.userId)
    .eq("document_type", params.documentType)
    .eq("is_current", true)
    .maybeSingle();
  if (error || !document) return NextResponse.json({ error: "Verification evidence not found." }, { status: 404 });

  const { data: signed, error: signedError } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(document.storage_path, 120);
  if (signedError || !signed?.signedUrl) return NextResponse.json({ error: "Unable to create temporary evidence access." }, { status: 500 });

  return NextResponse.json({
    url: signed.signedUrl,
    filename: document.original_filename,
    mimeType: document.mime_type,
    expiresInSeconds: 120,
  });
}
