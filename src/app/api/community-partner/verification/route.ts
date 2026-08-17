import { NextRequest, NextResponse } from "next/server";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const ACCEPTED_CERTIFIERS = new Set([
  "justice_of_peace",
  "attorney_notary",
  "medical_doctor",
  "gazetted_police_officer",
  "school_principal",
  "bank_credit_union_manager",
  "marriage_officer_minister",
  "clerk_of_courts",
  "senior_public_officer",
  "jamaican_consular_officer",
]);

async function partner(request: NextRequest){const token=request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;const member=await getMemberFromToken(token);return member?.account.account_type==="community_partner"?member:null;}
function text(value: unknown, max = 180){return typeof value === "string" ? value.trim().slice(0,max) : "";}
function validCertifiedDate(value: string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const certified=new Date(`${value}T00:00:00Z`);if(Number.isNaN(certified.getTime()))return false;const now=new Date();const sixMonthsAgo=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-6,now.getUTCDate()));return certified<=now&&certified>=sixMonthsAgo;}

export async function POST(request:NextRequest){
 const member=await partner(request); if(!member)return NextResponse.json({error:"Community Partner access required."},{status:403});
 let body:Record<string,unknown>; try{body=await request.json();}catch{return NextResponse.json({error:"Invalid verification application."},{status:400});}
 const {data:profile,error:loadError}=await supabaseAdmin.from("community_partner_profiles").select("profile_complete,verification_status,verification_safeguarding_agreed").eq("user_id",member.user.id).maybeSingle();
 if(loadError||!profile?.profile_complete)return NextResponse.json({error:"Complete your Community Partner profile before requesting verification."},{status:400});
 if(profile.verification_status==="verified"&&profile.verification_safeguarding_agreed)return NextResponse.json({error:"Your Community Partner profile is already verified under the current verification standard."},{status:400});
 if(profile.verification_status==="pending")return NextResponse.json({error:"Your verification request is already pending review."},{status:400});

 const role=text(body.role);const affiliation=text(body.affiliation);const certifierType=text(body.certifierType);const certifierName=text(body.certifierName);const certifiedDate=text(body.certifiedDate,10);const referenceName=text(body.referenceName);const referenceContact=text(body.referenceContact);const credentials=text(body.credentials,500);const safeguardingAgreed=body.safeguardingAgreed===true;
 if(!role)return NextResponse.json({error:"Tell us the adult role or capacity in which you will support parents and families."},{status:400});
 if(!ACCEPTED_CERTIFIERS.has(certifierType))return NextResponse.json({error:"Choose an accepted identity certifier."},{status:400});
 if(!certifierName)return NextResponse.json({error:"Enter the certifier's name."},{status:400});
 if(!validCertifiedDate(certifiedDate))return NextResponse.json({error:"The certified ID must have been certified within the last 6 months and cannot be future-dated."},{status:400});
 if(!referenceName||!referenceContact)return NextResponse.json({error:"Provide an adult reference and contact information."},{status:400});
 if(!safeguardingAgreed)return NextResponse.json({error:"You must accept the safeguarding declaration before requesting verification."},{status:400});
 const {data:documents,error:documentsError}=await supabaseAdmin.from("community_partner_verification_documents").select("document_type").eq("user_id",member.user.id).eq("is_current",true);
 if(documentsError)return NextResponse.json({error:"Unable to confirm your verification evidence."},{status:500});
 const kinds=new Set((documents||[]).map(d=>d.document_type));
 if(!kinds.has("certified_id")||!kinds.has("verification_photo"))return NextResponse.json({error:"Upload both your certified identification and private verification photo before requesting review."},{status:400});
 const now=new Date().toISOString();
 const {error}=await supabaseAdmin.from("community_partner_profiles").update({verification_application_role:role,verification_application_affiliation:affiliation||null,verification_identity_certifier_type:certifierType,verification_identity_certifier_name:certifierName,verification_certified_date:certifiedDate,verification_reference_name:referenceName,verification_reference_contact:referenceContact,verification_credentials_details:credentials||null,verification_safeguarding_agreed:true,verification_safeguarding_agreed_at:now,verification_status:"pending",verification_submitted_at:now,verification_reviewed_at:null,verification_reviewed_by:null,verification_identity_evidence:false,verification_contact_confirmed:false,verification_reference_reviewed:false,verification_credentials_reviewed:false}).eq("user_id",member.user.id);
 if(error)return NextResponse.json({error:"Unable to submit your verification request."},{status:500});
 return NextResponse.json({ok:true,message:"Your verification application and private evidence have been submitted for review."});
}
