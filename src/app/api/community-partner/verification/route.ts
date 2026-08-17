import { NextRequest, NextResponse } from "next/server";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

async function partner(request: NextRequest){const token=request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;const member=await getMemberFromToken(token);return member?.account.account_type==="community_partner"?member:null;}
export async function POST(request:NextRequest){
 const member=await partner(request); if(!member)return NextResponse.json({error:"Community Partner access required."},{status:403});
 const {data:profile,error:loadError}=await supabaseAdmin.from("community_partner_profiles").select("profile_complete,verification_status").eq("user_id",member.user.id).maybeSingle();
 if(loadError||!profile?.profile_complete)return NextResponse.json({error:"Complete your Community Partner profile before requesting verification."},{status:400});
 if(profile.verification_status==="verified")return NextResponse.json({error:"Your Community Partner profile is already verified."},{status:400});
 if(profile.verification_status==="pending")return NextResponse.json({error:"Your verification request is already pending review."},{status:400});
 const {error}=await supabaseAdmin.from("community_partner_profiles").update({verification_status:"pending",verification_submitted_at:new Date().toISOString(),verification_reviewed_at:null,verification_reviewed_by:null}).eq("user_id",member.user.id);
 if(error)return NextResponse.json({error:"Unable to submit your verification request."},{status:500});
 return NextResponse.json({ok:true,message:"Your verification request has been submitted for review."});
}
