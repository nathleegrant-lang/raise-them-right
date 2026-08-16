import { NextRequest, NextResponse } from "next/server";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const ALLOWED_SUPPORT_AREAS = new Set([
  "parenting_guidance",
  "education_learning",
  "family_routines",
  "positive_discipline",
  "faith_family",
  "community_resources",
  "emotional_encouragement",
]);
const ALLOWED_HOUSEHOLD_STAGES = new Set(["early_childhood", "primary_years", "teen_years", "young_adult_transition"]);
const ALLOWED_PREFERRED_SUPPORT = new Set(["information_resources", "one_to_one_guidance", "group_support", "workshops", "community_referral"]);
const ALLOWED_AVAILABILITY = new Set(["weekday_mornings", "weekday_afternoons", "weekday_evenings", "weekends", "flexible"]);

function safeSelection(value: unknown, allowed: Set<string>) {
  if (!Array.isArray(value)) return [];

  const filtered = value.filter(
    (item): item is string => typeof item === "string" && allowed.has(item)
  );

  return filtered.filter((item, index) => filtered.indexOf(item) === index);
}

async function requireParent(request: NextRequest) {
  const token = request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;
  const member = await getMemberFromToken(token);
  if (!member || member.account.account_type !== "parent") return null;
  return member;
}

export async function GET(request: NextRequest) {
  const member = await requireParent(request);
  if (!member) return NextResponse.json({ error: "Parent access required." }, { status: 403 });

  const { data, error } = await supabaseAdmin
    .from("parent_profiles")
    .select("support_areas, household_stage, preferred_support, availability, profile_complete")
    .eq("user_id", member.user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: "Unable to load Parent profile." }, { status: 500 });
  return NextResponse.json({ profile: data });
}

export async function POST(request: NextRequest) {
  const member = await requireParent(request);
  if (!member) return NextResponse.json({ error: "Parent access required." }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid profile request." }, { status: 400 });
  }

  const supportAreas = safeSelection(body.supportAreas, ALLOWED_SUPPORT_AREAS);
  const householdStage = safeSelection(body.householdStage, ALLOWED_HOUSEHOLD_STAGES);
  const preferredSupport = safeSelection(body.preferredSupport, ALLOWED_PREFERRED_SUPPORT);
  const availability = safeSelection(body.availability, ALLOWED_AVAILABILITY);

  if (!supportAreas.length || !householdStage.length || !preferredSupport.length) {
    return NextResponse.json({ error: "Choose at least one support area, household stage and support preference." }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("parent_profiles").upsert({
    user_id: member.user.id,
    support_areas: supportAreas,
    household_stage: householdStage,
    preferred_support: preferredSupport,
    availability,
    profile_complete: true,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });

  if (error) return NextResponse.json({ error: "Unable to save Parent profile." }, { status: 500 });

  return NextResponse.json({ ok: true, message: "Your Parent profile has been saved." });
}
