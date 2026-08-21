import {requireMember} from "../../../lib/memberAuth";
import {supabaseAdmin} from "../../../lib/supabaseAdmin";
import VerificationClient from "./VerificationClient";
export default async function VerificationPage(){const {user}=await requireMember("community_partner");const {data}=await supabaseAdmin.from("community_partner_profiles").select("verification_status,verification_safeguarding_agreed").eq("user_id",user.id).maybeSingle();return <VerificationClient status={data?.verification_status||"not_started"} currentStandard={Boolean(data?.verification_safeguarding_agreed)}/>;}
