import Link from "next/link";
import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const labels: Record<string,string> = {
 parenting_guidance:"Parenting guidance", education_learning:"Education & learning support", family_routines:"Family routines & organisation", positive_discipline:"Positive discipline", faith_family:"Faith & family encouragement", community_resources:"Community resources", emotional_encouragement:"Encouragement for me as a parent",
 planning:"Planning ahead", soon:"Helpful soon", prompt:"Prompt response requested", open:"Open", paused:"Paused", closed:"Closed"
};
function list(values:string[]|null){return (values||[]).map(v=>labels[v]||v).join(", ");}
const filters=["all","open","paused","closed"] as const;
type Filter=(typeof filters)[number];

export default async function ParentSupportRequestsPage({searchParams}:{searchParams?:{status?:string}}){
 const {user}=await requireMember("parent");
 const requested=typeof searchParams?.status==="string"?searchParams.status:"all";
 const activeFilter:Filter=(filters as readonly string[]).includes(requested)?requested as Filter:"all";
 let query=supabaseAdmin.from("parent_support_requests").select("id,support_areas,urgency,status,created_at").eq("parent_user_id",user.id).order("created_at",{ascending:false});
 if(activeFilter!=="all") query=query.eq("status",activeFilter);
 const {data:requests}=await query;
 const filterStyle={display:"inline-block",padding:".55rem .9rem",borderRadius:"999px",border:"1px solid rgba(11,29,58,.18)",textDecoration:"none",fontWeight:700} as const;
 return <main className="pledge-page">
  <section className="pledge-hero" style={{textAlign:"center"}}><p className="eyebrow">#RaiseThemRight Community</p><h1>My Support Requests</h1><p>Track your requests without wading through long detail cards.</p></section>
  <section className="pledge-card">
   <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem",flexWrap:"wrap",marginBottom:"1rem"}}><Link href="/parent/onboarding" style={{fontWeight:700,color:"#0b1d3a"}}>← Parent Home</Link><MemberSignOut/></div>
   <div role="note" style={{padding:"1.15rem 1.25rem",borderRadius:"12px",background:"#fff8e7",border:"1px solid #f2b632",borderLeft:"5px solid #f2b632",marginBottom:"1.25rem",color:"#13213a"}}><strong style={{display:"block",fontSize:"1.05rem"}}>Your support journey stays parent-focused</strong><p style={{margin:"0.4rem 0 0"}}>This history records broad support needs and the adult support journey. It is not a case file about a child and should not contain child-identifying details.</p></div>
   <div style={{display:"flex",gap:".6rem",flexWrap:"wrap",marginBottom:"1.25rem"}}>{filters.map(filter=><Link key={filter} href={filter==="all"?"/parent/support-requests":`/parent/support-requests?status=${filter}`} style={{...filterStyle,background:activeFilter===filter?"#f5b82e":"#fff",color:"#0b1d3a"}}>{filter==="all"?"All":labels[filter]}</Link>)}</div>
   {!requests?.length ? <div style={{padding:"1.5rem",border:"1px solid #ddd",borderRadius:"14px"}}><h2>No {activeFilter==="all"?"support requests":`${labels[activeFilter].toLowerCase()} requests`}</h2><p>{activeFilter==="all"?"When you create a request, it will appear here.":"There are no requests in this status right now."}</p>{activeFilter==="all"?<Link href="/parent/support-request" className="button primary">Request Support</Link>:null}</div> : <div style={{display:"grid",gap:".75rem"}}>{requests.map((request:any)=><article key={request.id} style={{border:"1px solid rgba(11,29,58,.14)",borderRadius:"14px",padding:"1rem 1.1rem",background:"#fffdf7",display:"grid",gridTemplateColumns:"minmax(0,1fr) auto",gap:"1rem",alignItems:"center"}}><div><div style={{display:"flex",alignItems:"center",gap:".7rem",flexWrap:"wrap"}}><h2 style={{margin:0,fontSize:"1.2rem"}}>{list(request.support_areas)}</h2><span style={{padding:".28rem .65rem",borderRadius:"999px",background:"#eef5ff",color:"#0b3a70",fontWeight:700,fontSize:".9rem"}}>{labels[request.status]||request.status}</span></div><p style={{margin:".4rem 0 0",color:"#5f6b7a"}}>Created {new Date(request.created_at).toLocaleDateString("en-JM",{year:"numeric",month:"short",day:"numeric"})} · {labels[request.urgency]||request.urgency}</p></div><Link href={`/parent/support-requests/${request.id}`} className="button primary" style={{whiteSpace:"nowrap"}}>View Details</Link></article>)}</div>}
  </section>
 </main>;
}
