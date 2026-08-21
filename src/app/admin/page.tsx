import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { requireAdmin } from "../../lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  const [
    pledgeCount,
    volunteerCount,
    supportCount,
    pendingVerificationCount,
    openSafetyConcernCount,
    recentPledges,
    recentVolunteers,
    recentSupport,
  ] = await Promise.all([
    supabaseAdmin.from("pledges").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("volunteers").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("support_requests").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("community_partner_profiles").select("user_id", { count: "exact", head: true }).eq("verification_status", "pending"),
    supabaseAdmin.from("protected_connection_safety_events").select("id", { count: "exact", head: true }).eq("event_type", "concern_reported").eq("admin_review_status", "open"),
    supabaseAdmin.from("pledges").select("first_name,last_name,email,country,parish_state,created_at").order("created_at", { ascending: false }).limit(5),
    supabaseAdmin.from("volunteers").select("first_name,last_name,email,phone,country,parish_state,created_at").order("created_at", { ascending: false }).limit(5),
    supabaseAdmin.from("support_requests").select("first_name,email,country,parish_state,request_details,created_at").order("created_at", { ascending: false }).limit(5),
  ]);

  const countries = new Set([
    ...(recentPledges.data?.map((item) => item.country).filter(Boolean) ?? []),
    ...(recentVolunteers.data?.map((item) => item.country).filter(Boolean) ?? []),
    ...(recentSupport.data?.map((item) => item.country).filter(Boolean) ?? []),
  ]);

  return (
    <main className="mission-page">
      <aside className="mission-sidebar">
        <div><p className="mission-brand">#RaiseThemRight</p><h2>Mission Control</h2></div>
        <nav className="mission-nav">
          <a href="/admin">Dashboard</a>
          <a href="/admin/community-verifications">Partner Verification{pendingVerificationCount.count ? ` (${pendingVerificationCount.count})` : ""}</a>
          <a href="/admin/safety-concerns">Safety Concerns{openSafetyConcernCount.count ? ` (${openSafetyConcernCount.count})` : ""}</a>
          <a href="/admin/pledges">Pledges</a><a href="/admin/volunteers">Community Partners</a><a href="/admin/support">Connection Requests</a><a href="/admin/analytics">Analytics</a><a href="/admin/export">Export</a>
        </nav>
        <form action="/api/admin/logout" method="post"><button className="button secondary" type="submit">Sign Out</button></form>
        <a className="mission-return" href="/">Return to Website</a>
      </aside>
      <section className="mission-main">
        <header className="mission-top"><div><p className="eyebrow">Dashboard Overview</p><h1>Good day, Nathlee.</h1><p>Here is what is happening across the #RaiseThemRight movement.</p></div><div className="mission-date"><span>Live Database</span><strong>Supabase Connected</strong></div></header>
        {openSafetyConcernCount.count ? <div role="alert" style={{padding:"1rem",marginBottom:"1rem",border:"1px solid #f2b8b5",borderLeft:"5px solid #b42318",borderRadius:"12px",background:"#fff4f2"}}><strong>{openSafetyConcernCount.count} open safety concern{openSafetyConcernCount.count===1?"":"s"}</strong><p style={{margin:".25rem 0 .6rem"}}>A protected connection was stopped and requires Mission Control review.</p><a href="/admin/safety-concerns" style={{fontWeight:800,color:"#9b1c1c"}}>Review Safety Concerns →</a></div> : null}
        <section className="mission-stats">
          <article className="mission-stat-card"><span>Total Pledges</span><strong>{pledgeCount.count ?? 0}</strong><p>People who have committed to the pledge.</p></article>
          <article className="mission-stat-card"><span>Community Partners</span><strong>{volunteerCount.count ?? 0}</strong><p>People who have become community partners.</p></article>
          <article className="mission-stat-card"><span>Connection Requests</span><strong>{supportCount.count ?? 0}</strong><p>Families and individuals requesting connection.</p></article>
          <article className="mission-stat-card"><span>Communities Reached</span><strong>{countries.size}</strong><p>Countries represented in current submissions.</p></article>
        </section>
        <section className="mission-panels">
          <article className="mission-panel"><div className="mission-panel-header"><h3>Recent Pledges</h3><a href="/admin/pledges">View all</a></div>{recentPledges.data?.map((item,index)=><div className="mission-record" key={index}><strong>{item.first_name} {item.last_name}</strong><span>{item.country}{item.parish_state&&` • ${item.parish_state}`}</span></div>)}</article>
          <article className="mission-panel"><div className="mission-panel-header"><h3>Recent Community Partners</h3><a href="/admin/volunteers">View all</a></div>{recentVolunteers.data?.map((item,index)=><div className="mission-record" key={index}><strong>{item.first_name} {item.last_name}</strong><span>{item.email}</span></div>)}</article>
          <article className="mission-panel mission-panel-wide"><div className="mission-panel-header"><h3>Recent Connection Requests</h3><a href="/admin/support">View all</a></div>{recentSupport.data?.map((item,index)=><div className="mission-record" key={index}><strong>{item.first_name}</strong><span>{item.request_details}</span></div>)}</article>
        </section>
      </section>
    </main>
  );
}
