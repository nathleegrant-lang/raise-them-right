import { NextRequest, NextResponse } from "next/server";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const ACCEPTED_CERTIFIERS = new Set(["justice_of_peace","attorney_notary","medical_doctor","gazetted_police_officer","school_principal","bank_credit_union_manager","marriage_officer_minister","clerk_of_courts","senior_public_officer","jamaican_consular_officer"]);
async function partner(request: NextRequest){const token=request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;const member=await getMemberFromToken(token);return member?.account.account_type==="community_partner"?member:null;}
function text(value: unknown, max = 180){return typeof value === "string" ? value.trim().slice(0,max) : "";}
function recentDate(value:string){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(`${value}T00:00:00Z`);if(Number.isNaN(date.getTime()))return false;const now=new Date();const sixMonthsAgo=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()-6,now.getUTCDate()));return date<=now&&date>=sixMonthsAgo;}

export async function GET(request:NextRequest){
 const member=await partner(request); if(!member)return NextResponse.json({error:"Community Partner access required."},{status:403});
 const {data,error}=await supabaseAdmin.from("community_partner_profiles").select("verification_application_role,verification_application_affiliation,verification_identity_certifier_type,verification_identity_certifier_name,verification_certified_date,verification_reference_name,verification_reference_contact,verification_reference_relationship,verification_reference_letter_date,verification_credentials_details,verification_safeguarding_agreed").eq("user_id",member.user.id).maybeSingle();
 if(error)return NextResponse.json({error:"Unable to load your saved verification application."},{status:500});
 return NextResponse.json({application:{
  role:data?.verification_application_role||"",
  affiliation:data?.verification_application_affiliation||"",
  certifierType:data?.verification_identity_certifier_type||"",
  certifierName:data?.verification_identity_certifier_name||"",
  certifiedDate:data?.verification_certified_date||"",
  referenceName:data?.verification_reference_name||"",
  referenceContact:data?.verification_reference_contact||"",
  referenceRelationship:data?.verification_reference_relationship||"",
  referenceLetterDate:data?.verification_reference_letter_date||"",
  credentials:data?.verification_credentials_details||"",
  safeguardingAgreed:data?.verification_safeguarding_agreed===true
 }});
}

export async function POST(request:NextRequest){
 const member=await partner(request); if(!member)return NextResponse.json({error:"Community Partner access required."},{status:403});
 let body:Record<string,unknown>; try{body=await request.json();}catch{return NextResponse.json({error:"Invalid verification application."},{status:400});}
 const {data:profile,error:loadError}=await supabaseAdmin.from("community_partner_profiles").select("profile_complete,verification_status,verification_safeguarding_agreed").eq("user_id",member.user.id).maybeSingle();
 if(loadError||!profile?.profile_complete)return NextResponse.json({error:"Complete your Community Partner profile before requesting verification."},{status:400});
 if(profile.verification_status==="verified"&&profile.verification_safeguarding_agreed)return NextResponse.json({error:"Your Community Partner profile is already verified under the current verification standard."},{status:400});
 if(profile.verification_status==="pending")return NextResponse.json({error:"Your verification request is already pending review."},{status:400});
 const role=text(body.role),affiliation=text(body.affiliation),certifierType=text(body.certifierType),certifierName=text(body.certifierName),certifiedDate=text(body.certifiedDate,10),referenceName=text(body.referenceName),referenceContact=text(body.referenceContact),referenceRelationship=text(body.referenceRelationship),referenceLetterDate=text(body.referenceLetterDate,10),credentials=text(body.credentials,500);const safeguardingAgreed=body.safeguardingAgreed===true;
 if(!role)return NextResponse.json({error:"Tell us the adult role or capacity in which you will support parents and families."},{status:400});
 if(!ACCEPTED_CERTIFIERS.has(certifierType))return NextResponse.json({error:"Choose an accepted identity certifier."},{status:400});
 if(!certifierName)return NextResponse.json({error:"Enter the certifier's name."},{status:400});
 if(!recentDate(certifiedDate))return NextResponse.json({error:"The certified ID must have been certified within the last 6 months and cannot be future-dated."},{status:400});
 if(!referenceName||!referenceContact||!referenceRelationship)return NextResponse.json({error:"Provide the adult referee's name, relationship/capacity and contact information."},{status:400});
 if(!recentDate(referenceLetterDate))return NextResponse.json({error:"The reference letter must be dated within the last 6 months and cannot be future-dated."},{status:400});
 if(!safeguardingAgreed)return NextResponse.json({error:"You must accept the safeguarding declaration before requesting verification."},{status:400});
 const {data:documents,error:documentsError}=await supabaseAdmin.from("community_partner_verification_documents").select("document_type").eq("user_id",member.user.id).eq("is_current",true);
 if(documentsError)return NextResponse.json({error:"Unable to confirm your verification evidence."},{status:500});
 const kinds=new Set((documents||[]).map(d=>d.document_type));
 if(!kinds.has("certified_id")||!kinds.has("verification_photo")||!kinds.has("reference_letter"))return NextResponse.json({error:"Upload your certified identification, private verification photo and reference letter before requesting review."},{status:400});
 const now=new Date().toISOString();
 const {error}=await supabaseAdmin.from("community_partner_profiles").update({verification_application_role:role,verification_application_affiliation:affiliation||null,verification_identity_certifier_type:certifierType,verification_identity_certifier_name:certifierName,verification_certified_date:certifiedDate,verification_reference_name:referenceName,verification_reference_contact:referenceContact,verification_reference_relationship:referenceRelationship,verification_reference_letter_date:referenceLetterDate,verification_credentials_details:credentials||null,verification_safeguarding_agreed:true,verification_safeguarding_agreed_at:now,verification_status:"pending",verification_submitted_at:now,verification_reviewed_at:null,verification_reviewed_by:null,verification_identity_evidence:false,verification_contact_confirmed:false,verification_reference_reviewed:false,verification_reference_confirmed:false,verification_credentials_reviewed:false}).eq("user_id",member.user.id);
 if(error)return NextResponse.json({error:"Unable to submit your verification request."},{status:500});
 return NextResponse.json({ok:true,message:"Your verification application and private evidence have been submitted for review."});
}
