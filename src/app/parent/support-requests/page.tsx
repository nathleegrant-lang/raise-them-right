import Link from "next/link";
import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const labels: Record<string,string> = {
 parenting_guidance:"Parenting guidance", education_learning:"Education & learning support", family_routines:"Family routines & organisation", positive_discipline:"Positive discipline", faith_family:"Faith & family encouragement", community_resources:"Community resources", emotional_encouragement:"Encouragement for me as a parent",
 early_childhood:"Early childhood", primary_years:"Primary years", teen_years:"Teen years", young_adult_transition:"Young-adult transition",
 information_resources:"Information & resources", one_to_one_guidance:"One-to-one adult guidance", group_support:"Parent group support", workshops:"Workshops / learning sessions", community_referral:"Community resource referral",
 planning:"Planning ahead", soon:"Helpful soon", prompt:"Prompt response requested", open:"Open", paused:"Paused", closed:"Closed"
};
function list(values:string[]|null){return (values||[]).map(v=>labels[v]||v).join(", ");}

export default async function ParentSupportRequestsPage(){
 const {user}=await requireMember("parent");
 const {data:requests}=await supabaseAdmin.from("parent_support_requests").select("id,support_areas,family_stage,preferred_support,availability,urgency,status,created_at").eq("parent_user_id",user.id).order("created_at",{ascending:false});
 return <main className="pledge-page">
  <section className="pledge-hero" style={{textAlign:"center"}}><p className="eyebrow">#RaiseThemRight Community</p><h1>My Support Requests</h1><p>Your private record of the adult-to-adult support you have requested.</p></section>
  <section className="pledge-card">
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem",flexWrap:"wrap",marginBottom:"1rem"}}><Link href="/parent/onboarding" style={{fontWeight:700,color:"#0b1d3a"}}>← Parent Home</Link><MemberSignOut/></div>
   <div role="note" style={{padding:"1.15rem 1.25rem",borderRadius:"12px",background:"#fff8e7",border:"1px solid #f2b632",borderLeft:"5px solid #f2b632",marginBottom:"1.5rem",color:"#13213a"}}><strong style={{display:"block",fontSize:"1.05rem"}}>Your support journey stays parent-focused</strong><p style={{margin:"0.4rem 0 0"}}>This history records broad support needs and the adult support journey. It is not a case file about a child and should not contain child-identifying details.</p></div>
   {!requests?.length ? <div style={{padding:"1.5rem",border:"1px solid #ddd",borderRadius:"14px"}}><h2>No support requests yet</h2><p>When you create a request, it will appear here.</p><Link href="/parent/support-request" className="button primary">Request Support</Link></div> : <div style={{display:"grid",gap:"1rem"}}>{requests.map((request:any)=><article key={request.id} style={{border:"1px solid rgba(11,29,58,.14)",borderRadius:"16px",padding:"1.25rem",background:"#fffdf7"}}><div style={{display:"flex",justifyContent:"space-between",gap:"1rem",flexWrap:"wrap"}}><div><p className="eyebrow">SUPPORT REQUEST</p><h2 style={{margin:"0 0 .35rem"}}>{list(request.support_areas)}</h2><p style={{margin:0,color:"#5f6b7a"}}>Created {new Date(request.created_at).toLocaleDateString("en-JM",{year:"numeric",month:"long",day:"numeric"})}</p></div><span style={{height:"fit-content",padding:".4rem .75rem",borderRadius:"999px",background:"#eef5ff",color:"#0b3a70",fontWeight:700}}>{labels[request.status]||request.status}</span></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:".8rem",marginTop:"1rem"}}><div><strong>Family stage</strong><p style={{margin:".25rem 0"}}>{list(request.family_stage)}</p></div><div><strong>Preferred support</strong><p style={{margin:".25rem 0"}}>{list(request.preferred_support)}</p></div><div><strong>Timing</strong><p style={{margin:".25rem 0"}}>{labels[request.urgency]||request.urgency}</p></div></div><div style={{marginTop:"1rem",padding:"1rem",borderRadius:"12px",background:"#f7f4eb"}}><strong>Assistance received</strong><p style={{margin:".35rem 0 0"}}>No assistance has been recorded yet. This will update as the support journey develops.</p></div></article>)}</div>}
  </section>
 </main>;
}
