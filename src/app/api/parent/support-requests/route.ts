import { NextRequest, NextResponse } from "next/server";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const SUPPORT = ["parenting_guidance","education_learning","family_routines","positive_discipline","faith_family","community_resources","emotional_encouragement"];
const STAGES = ["early_childhood","primary_years","teen_years","young_adult_transition"];
const FORMATS = ["information_resources","one_to_one_guidance","group_support","workshops","community_referral"];
const TIMES = ["weekday_mornings","weekday_afternoons","weekday_evenings","weekends","flexible"];
const URGENCY = ["planning","soon","prompt"];
function clean(value: unknown, allowed: string[]) { if (!Array.isArray(value)) return []; return Array.from(new Set(value.filter((v): v is string => typeof v === "string" && allowed.includes(v)))); }
async function parent(request: NextRequest) { const token = request.cookies.get(MEMBER_ACCESS_COOKIE)?.value; const member = await getMemberFromToken(token); return member?.account.account_type === "parent" ? member : null; }

export async function GET(request: NextRequest) {
  const member = await parent(request); if (!member) return NextResponse.json({ error: "Parent access required." }, { status: 403 });
  const { data, error } = await supabaseAdmin.from("parent_support_requests").select("id,support_areas,family_stage,preferred_support,availability,urgency,status,created_at").eq("parent_user_id", member.user.id).order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: "Unable to load support requests." }, { status: 500 });
  return NextResponse.json({ requests: data || [] });
}

export async function POST(request: NextRequest) {
  const member = await parent(request); if (!member) return NextResponse.json({ error: "Parent access required." }, { status: 403 });
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid support request." }, { status: 400 }); }
  const supportAreas = clean(body.supportAreas, SUPPORT); const familyStage = clean(body.familyStage, STAGES); const preferredSupport = clean(body.preferredSupport, FORMATS); const availability = clean(body.availability, TIMES); const urgency = typeof body.urgency === "string" && URGENCY.includes(body.urgency) ? body.urgency : "planning";
  if (!supportAreas.length || !familyStage.length || !preferredSupport.length) return NextResponse.json({ error: "Choose at least one support area, broad family stage and support preference." }, { status: 400 });
  const { data, error } = await supabaseAdmin.from("parent_support_requests").insert({ parent_user_id: member.user.id, support_areas: supportAreas, family_stage: familyStage, preferred_support: preferredSupport, availability, urgency, status: "open" }).select("id").single();
  if (error) return NextResponse.json({ error: "Unable to create support request." }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id, message: "Your support request has been created safely." });
}
