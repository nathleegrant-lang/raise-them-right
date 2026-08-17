import Link from "next/link";
import { notFound } from "next/navigation";
import MemberSignOut from "../../../../components/MemberSignOut";
import { requireMember } from "../../../../lib/memberAuth";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const labels: Record<string,string> = {
 parenting_guidance:"Parenting guidance", education_learning:"Education & learning support", family_routines:"Family routines & organisation", positive_discipline:"Positive discipline", faith_family:"Faith & family encouragement", community_resources:"Community resources", emotional_encouragement:"Encouragement for me as a parent",
 early_childhood:"Early childhood", primary_years:"Primary years", teen_years:"Teen years", young_adult_transition:"Young-adult transition",
 information_resources:"Information & resources", one_to_one_guidance:"One-to-one adult guidance", group_support:"Parent group support", workshops:"Workshops / learning sessions", community_referral:"Community resource referral",
 weekday_mornings:"Weekday mornings", weekday_afternoons:"Weekday afternoons", weekday_evenings:"Weekday evenings", weekends:"Weekends", flexible:"Flexible",
 planning:"Planning ahead", soon:"Helpful soon", prompt:"Prompt response requested", open:"Open", paused:"Paused", closed:"Closed"
};
function list(values:string[]|null){return (values||[]).map(v=>labels[v]||v).join(", ") || "Not specified";}

export default async function ParentSupportRequestDetailPage({params}:{params:{id:string}}){
 const {user}=await requireMember("parent");
 const {data:request}=await supabaseAdmin.from("parent_support_requests").select("id,support_areas,family_stage,preferred_support,availability,urgency,status,created_at").eq("id",params.id).eq("parent_user_id",user.id).maybeSingle();
 if(!request) notFound();
 return <main className="pledge-page">
  <section className="pledge-hero" style={{textAlign:"center"}}><p className="eyebrow">#RaiseThemRight Community</p><h1>Support Request Details</h1><p>Review this support request and its current journey.</p></section>
  <section className="pledge-card">
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem",flexWrap:"wrap",marginBottom:"1rem"}}><Link href="/parent/support-requests" style={{fontWeight:700,color:"#0b1d3a"}}>← My Support Requests</Link><MemberSignOut/></div>
   <div role="note" style={{padding:"1.15rem 1.25rem",borderRadius:"12px",background:"#fff8e7",border:"1px solid #f2b632",borderLeft:"5px solid #f2b632",marginBottom:"1.5rem",color:"#13213a"}}><strong style={{display:"block",fontSize:"1.05rem"}}>Your support journey stays parent-focused</strong><p style={{margin:"0.4rem 0 0"}}>This record contains broad adult-support information only. It is not a case file about a child.</p></div>
   <article style={{border:"1px solid rgba(11,29,58,.14)",borderRadius:"16px",padding:"1.4rem",background:"#fffdf7"}}>
    <div style={{display:"flex",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}><div><p className="eyebrow">SUPPORT REQUEST</p><h2 style={{margin:"0 0 .35rem"}}>{list(request.support_areas)}</h2><p style={{margin:0,color:"#5f6b7a"}}>Created {new Date(request.created_at).toLocaleDateString("en-JM",{year:"numeric",month:"long",day:"numeric"})}</p></div><span style={{height:"fit-content",padding:".4rem .75rem",borderRadius:"999px",background:"#eef5ff",color:"#0b3a70",fontWeight:700}}>{labels[request.status]||request.status}</span></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"1rem",marginTop:"1.25rem"}}><div><strong>Family stage</strong><p>{list(request.family_stage)}</p></div><div><strong>Preferred support</strong><p>{list(request.preferred_support)}</p></div><div><strong>Availability</strong><p>{list(request.availability)}</p></div><div><strong>Timing</strong><p>{labels[request.urgency]||request.urgency}</p></div></div>
    <div style={{marginTop:"1rem",padding:"1rem",borderRadius:"12px",background:"#f7f4eb"}}><strong>Assistance received</strong><p style={{margin:".35rem 0 0"}}>No assistance has been recorded yet. This will update as the support journey develops.</p></div>
   </article>
  </section>
 </main>;
}
