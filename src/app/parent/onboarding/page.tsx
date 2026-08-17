import Link from "next/link";
import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function ParentOnboardingPage() {
  const { account, user } = await requireMember("parent");
  const { data: profile } = await supabaseAdmin.from("parent_profiles").select("profile_complete").eq("user_id", user.id).maybeSingle();
  const { count: openRequests } = await supabaseAdmin.from("parent_support_requests").select("id", { count: "exact", head: true }).eq("parent_user_id", user.id).eq("status", "open");
  const profileComplete = Boolean(profile?.profile_complete);
  const cardStyle = { border: "1px solid rgba(11, 29, 58, 0.14)", borderRadius: "16px", padding: "1.25rem", background: "#fffdf7" } as const;
  return <main className="pledge-page">
    <section className="pledge-hero" style={{textAlign:"center"}}><p className="eyebrow">#RaiseThemRight Community</p><h1 style={{marginBottom:"0.25rem"}}>Welcome</h1><p style={{fontSize:"clamp(2rem, 4vw, 3.25rem)",fontFamily:'"Segoe Script", "Brush Script MT", cursive',fontWeight:400,fontStyle:"italic",margin:"0 auto 0.75rem",textAlign:"center"}}>{account.first_name}</p><p>Your Parent community home.</p></section>
    <section className="pledge-card"><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem",flexWrap:"wrap",marginBottom:"1.25rem"}}><div><h2 style={{marginBottom:"0.25rem"}}>Parent Home</h2><p style={{margin:0}}>Manage your profile and your support journey.</p></div><MemberSignOut /></div>
    <div role="note" style={{padding:"1.15rem 1.25rem",borderRadius:"12px",background:"#fff8e7",border:"1px solid #f2b632",borderLeft:"5px solid #f2b632",marginBottom:"1.5rem",color:"#13213a"}}><strong style={{display:"block",fontSize:"1.05rem"}}>A quick privacy reminder</strong><p style={{margin:"0.4rem 0 0",lineHeight:1.5}}>Keep child-identifying information private throughout #RaiseThemRight. The platform is designed around adult-to-adult support and broad family needs.</p></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:"1rem"}}>
      <div style={cardStyle}><p className="eyebrow">MY PROFILE</p><h3>{profileComplete?"Profile ready":"Complete your profile"}</h3><p>{profileComplete?"Review or update the kinds of support that may be useful to your family.":"Tell us about your broad support needs and preferences without entering child-identifying information."}</p><Link href="/parent/profile" className="button primary">{profileComplete?"View My Profile":"Complete My Profile"}</Link></div>
      <div style={cardStyle}><p className="eyebrow">SUPPORT</p><h3>Request Support</h3><p>Create a structured request using broad family needs only. No child's name, school, exact age or personal story is needed.</p><Link href="/parent/support-request" className="button primary">Request Support</Link></div>
      <div style={cardStyle}><p className="eyebrow">MY SUPPORT</p><h3>My Support Requests</h3><p>See every support request you have made, its current status, and the assistance recorded as your support journey develops.</p>{openRequests ? <p style={{fontWeight:700}}>Open requests: {openRequests}</p> : <p style={{fontWeight:700}}>No open requests</p>}<Link href="/parent/support-requests" className="button primary">View My Requests</Link></div>
      <div style={cardStyle}><p className="eyebrow">RESOURCES</p><h3>Parent Resources</h3><p>Guides, reflections and practical family resources will be available here as the community resource library grows.</p><span style={{display:"inline-block",fontWeight:700,color:"#5f6b7a"}}>Coming soon</span></div>
    </div></section></main>;
}
