import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getMemberFromToken, MEMBER_ACCESS_COOKIE } from "../../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";

const BUCKET = "verification-evidence";
const MAX_BYTES = 10 * 1024 * 1024;
const TYPES: Record<string,string> = { "image/jpeg":"jpg", "image/png":"png", "application/pdf":"pdf" };
const DOCUMENT_TYPES = new Set(["certified_id","verification_photo"]);

async function requirePartner(request: NextRequest) {
 const token=request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;
 const member=await getMemberFromToken(token);
 return member?.account.account_type==="community_partner" ? member : null;
}

export async function GET(request:NextRequest){
 const member=await requirePartner(request); if(!member)return NextResponse.json({error:"Community Partner access required."},{status:403});
 const {data,error}=await supabaseAdmin.from("community_partner_verification_documents").select("id,document_type,original_filename,mime_type,file_size_bytes,uploaded_at").eq("user_id",member.user.id).eq("is_current",true).order("uploaded_at",{ascending:false});
 if(error)return NextResponse.json({error:"Unable to load verification evidence status."},{status:500});
 return NextResponse.json({documents:data||[]});
}

export async function POST(request:NextRequest){
 const member=await requirePartner(request); if(!member)return NextResponse.json({error:"Community Partner access required."},{status:403});
 const form=await request.formData(); const documentType=String(form.get("documentType")||""); const file=form.get("file");
 if(!DOCUMENT_TYPES.has(documentType))return NextResponse.json({error:"Choose a valid verification document type."},{status:400});
 if(!(file instanceof File))return NextResponse.json({error:"Choose a file to upload."},{status:400});
 if(!TYPES[file.type])return NextResponse.json({error:"Only JPG, PNG or PDF files are accepted."},{status:400});
 if(file.size<=0||file.size>MAX_BYTES)return NextResponse.json({error:"The file must be no larger than 10 MB."},{status:400});
 if(documentType==="verification_photo" && file.type==="application/pdf")return NextResponse.json({error:"The verification photo must be a JPG or PNG image."},{status:400});
 const extension=TYPES[file.type]; const path=`community-partners/${member.user.id}/${documentType}/${randomUUID()}.${extension}`;
 const bytes=Buffer.from(await file.arrayBuffer());
 const {error:uploadError}=await supabaseAdmin.storage.from(BUCKET).upload(path,bytes,{contentType:file.type,upsert:false});
 if(uploadError)return NextResponse.json({error:"Unable to securely upload the verification evidence."},{status:500});
 const {data:oldDocs}=await supabaseAdmin.from("community_partner_verification_documents").select("id,storage_path").eq("user_id",member.user.id).eq("document_type",documentType).eq("is_current",true);
 const {error:insertError}=await supabaseAdmin.from("community_partner_verification_documents").insert({user_id:member.user.id,document_type:documentType,storage_path:path,original_filename:file.name.slice(0,180),mime_type:file.type,file_size_bytes:file.size,is_current:true});
 if(insertError){await supabaseAdmin.storage.from(BUCKET).remove([path]);return NextResponse.json({error:"Unable to record the verification evidence."},{status:500});}
 if(oldDocs?.length){await supabaseAdmin.from("community_partner_verification_documents").update({is_current:false}).in("id",oldDocs.map(d=>d.id));}
 return NextResponse.json({ok:true,message:documentType==="certified_id"?"Certified identification uploaded securely.":"Verification photo uploaded securely."});
}
