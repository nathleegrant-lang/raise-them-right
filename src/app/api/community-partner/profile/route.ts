import { NextRequest, NextResponse } from "next/server";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const SUPPORT_AREAS = ["parenting_guidance","education_learning","family_routines","faith_family","community_resources","career_life_skills","emotional_encouragement"];
const SUPPORT_FORMATS = ["one_to_one_adult_guidance","parent_groups","workshops","information_resources","community_referral"];
const SERVICE_SCOPE = ["online","local_community","parish_state","national"];
const AVAILABILITY = ["weekday_mornings","weekday_afternoons","weekday_evenings","weekends","flexible"];

function safeSelection(value: unknown, allowed: string[]) {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((item): item is string => typeof item === "string" && allowed.includes(item))));
}

async function requirePartner(request: NextRequest) {
  const token = request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;
  const member = await getMemberFromToken(token);
  return member?.account.account_type === "community_partner" ? member : null;
}

export async function GET(request: NextRequest) {
  const member = await requirePartner(request);
  if (!member) return NextResponse.json({ error: "Community Partner access required." }, { status: 403 });
  const { data, error } = await supabaseAdmin.from("community_partner_profiles").select("support_areas, support_formats, service_scope, availability, verification_status, profile_complete").eq("user_id", member.user.id).maybeSingle();
  if (error) return NextResponse.json({ error: "Unable to load Community Partner profile." }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function POST(request: NextRequest) {
  const member = await requirePartner(request);
  if (!member) return NextResponse.json({ error: "Community Partner access required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid profile request." }, { status: 400 }); }

  const supportAreas = safeSelection(body.supportAreas, SUPPORT_AREAS);
  const supportFormats = safeSelection(body.supportFormats, SUPPORT_FORMATS);
  const serviceScope = safeSelection(body.serviceScope, SERVICE_SCOPE);
  const availability = safeSelection(body.availability, AVAILABILITY);
  if (!supportAreas.length || !supportFormats.length || !serviceScope.length) return NextResponse.json({ error: "Choose at least one support area, support format and service area." }, { status: 400 });

  const { error } = await supabaseAdmin.from("community_partner_profiles").upsert({ user_id: member.user.id, support_areas: supportAreas, support_formats: supportFormats, service_scope: serviceScope, availability, profile_complete: true, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) return NextResponse.json({ error: "Unable to save Community Partner profile." }, { status: 500 });
  return NextResponse.json({ ok: true, message: "Your Community Partner profile has been saved." });
}
