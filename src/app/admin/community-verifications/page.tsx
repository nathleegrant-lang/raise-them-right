import Link from "next/link";
import { requireAdmin } from "../../../lib/adminAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import VerificationReviewClient from "./VerificationReviewClient";

const labels: Record<string,string> = {
 parenting_guidance:"Parenting guidance", education_learning:"Education & learning support", family_routines:"Family routines & organisation", faith_family:"Faith & family encouragement", community_resources:"Community resources", career_life_skills:"Career & life skills", emotional_encouragement:"Adult encouragement & listening",
 one_to_one_adult_guidance:"One-to-one adult guidance", parent_groups:"Parent group support", workshops:"Workshops / learning sessions", information_resources:"Information & resources", community_referral:"Community referrals",
 online:"Online", local_community:"Local community", parish_state:"Within parish / state", national:"Nationally",
 weekday_mornings:"Weekday mornings", weekday_afternoons:"Weekday afternoons", weekday_evenings:"Weekday evenings", weekends:"Weekends", flexible:"Flexible"
};
function list(values:string[]|null){return (values||[]).map(v=>labels[v]||v).join(", ") || "Not provided";}

export const dynamic = "force-dynamic";

export default async function CommunityVerificationsPage(){
 await requireAdmin();
 const {data:profiles}=await supabaseAdmin.from("community_partner_profiles").select("user_id,support_areas,support_formats,service_scope,availability,verification_submitted_at").eq("verification_status","pending").order("verification_submitted_at",{ascending:true});
 const ids=(profiles||[]).map(p=>p.user_id);
 const {data:accounts}=ids.length ? await supabaseAdmin.from("member_accounts").select("user_id,first_name,last_name,country,parish_state,account_status").in("user_id",ids) : {data:[] as any[]};
 const accountMap=new Map((accounts||[]).map(a=>[a.user_id,a]));
 return <main className="mission-page">
  <aside className="mission-sidebar"><div><p className="mission-brand">#RaiseThemRight</p><h2>Mission Control</h2></div><nav className="mission-nav"><Link href="/admin">Dashboard</Link><Link href="/admin/community-verifications">Partner Verification</Link></nav><form action="/api/admin/logout" method="post"><button className="button secondary" type="submit">Sign Out</button></form><Link className="mission-return" href="/">Return to Website</Link></aside>
  <section className="mission-main"><header className="mission-top"><div><p className="eyebrow">Safety & Verification</p><h1>Community Partner Verification</h1><p>Review adult Community Partners before they can access future Parent Support Opportunities.</p></div><div className="mission-date"><span>Pending Review</span><strong>{profiles?.length||0}</strong></div></header>
  <div style={{padding:"1rem 1.1rem",border:"1px solid #f2b632",borderLeft:"5px solid #f2b632",background:"#fff8e7",borderRadius:"12px",marginBottom:"1.5rem"}}><strong>Verification is a safety gate.</strong><p style={{margin:".35rem 0 0"}}>Approval confirms the adult Community Partner may participate in the protected support workflow. It does not authorize direct or independent contact with children.</p></div>
  {!profiles?.length ? <article className="mission-panel"><h2>No pending verification requests</h2><p>New Community Partner verification requests will appear here.</p></article> : <div style={{display:"grid",gap:"1rem"}}>{profiles.map(profile=>{const account=accountMap.get(profile.user_id);return <article key={profile.user_id} className="mission-panel"><div className="mission-panel-header"><div><p className="eyebrow">PENDING VERIFICATION</p><h2 style={{margin:".2rem 0"}}>{account?.first_name||"Community"} {account?.last_name||"Partner"}</h2><p style={{margin:0}}>{account?.country||""}{account?.parish_state?` • ${account.parish_state}`:""}</p></div><strong>Pending</strong></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1rem",marginTop:"1rem"}}><div><strong>Support areas</strong><p>{list(profile.support_areas)}</p></div><div><strong>Support formats</strong><p>{list(profile.support_formats)}</p></div><div><strong>Service area</strong><p>{list(profile.service_scope)}</p></div><div><strong>Availability</strong><p>{list(profile.availability)}</p></div></div><p style={{fontSize:".9rem",color:"#667085"}}>Requested {profile.verification_submitted_at?new Date(profile.verification_submitted_at).toLocaleString("en-JM",{dateStyle:"medium",timeStyle:"short"}):"date unavailable"}</p><VerificationReviewClient userId={profile.user_id}/></article>})}</div>}
  </section>
 </main>;
}
