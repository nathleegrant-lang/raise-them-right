import { supabaseAdmin } from "../../lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [
    pledgeCount,
    volunteerCount,
    supportCount,
    recentPledges,
    recentVolunteers,
    recentSupport,
  ] = await Promise.all([
    supabaseAdmin.from("pledges").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("volunteers").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("support_requests").select("*", { count: "exact", head: true }),

    supabaseAdmin
      .from("pledges")
      .select("first_name,last_name,email,country,parish_state,created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabaseAdmin
      .from("volunteers")
      .select("first_name,last_name,email,phone,country,parish_state,created_at")
      .order("created_at", { ascending: false })
      .limit(5),

    supabaseAdmin
      .from("support_requests")
      .select("first_name,email,country,parish_state,request_details,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const countries = new Set([
    ...(recentPledges.data?.map((item) => item.country).filter(Boolean) ?? []),
    ...(recentVolunteers.data?.map((item) => item.country).filter(Boolean) ?? []),
    ...(recentSupport.data?.map((item) => item.country).filter(Boolean) ?? []),
  ]);

  return (
    <main className="mission-page">
      <aside className="mission-sidebar">
        <div>
          <p className="mission-brand">#RaiseThemRight</p>
          <h2>Mission Control</h2>
        </div>

        <nav className="mission-nav">
          <a href="/admin">Dashboard</a>
          <a href="/admin/pledges">Pledges</a>
          <a href="/admin/volunteers">Community Partners</a>
          <a href="/admin/support">Connection Requests</a>
          <a href="/admin/analytics">Analytics</a>
          <a href="/admin/export">Export</a>
        </nav>

        <a className="mission-return" href="/">
          Return to Website
        </a>
      </aside>

      <section className="mission-main">
        <header className="mission-top">
          <div>
            <p className="eyebrow">Dashboard Overview</p>
            <h1>Good day, Nathlee.</h1>
            <p>
              Here is what is happening across the #RaiseThemRight movement.
            </p>
          </div>

          <div className="mission-date">
            <span>Live Database</span>
            <strong>Supabase Connected</strong>
          </div>
        </header>

        <section className="mission-stats">
          <article className="mission-stat-card">
            <span>Total Pledges</span>
            <strong>{pledgeCount.count ?? 0}</strong>
            <p>People who have committed to the pledge.</p>
          </article>

          <article className="mission-stat-card">
            <span>Community Partners</span>
            <strong>{volunteerCount.count ?? 0}</strong>
            <p>People who have become community partners.</p>
          </article>

          <article className="mission-stat-card">
            <span>Connection Requests</span>
            <strong>{supportCount.count ?? 0}</strong>
            <p>Families and individuals requesting connection.</p>
          </article>

          <article className="mission-stat-card">
            <span>Communities Reached</span>
            <strong>{countries.size}</strong>
            <p>Countries represented in current submissions.</p>
          </article>
        </section>

        <section className="mission-panels">
          <article className="mission-panel">
            <div className="mission-panel-header">
              <h3>Recent Pledges</h3>
              <a href="/admin/pledges">View all</a>
            </div>

            {recentPledges.data?.map((item, index) => (
              <div className="mission-record" key={index}>
                <strong>
                  {item.first_name} {item.last_name}
                </strong>
                <span>
                  {item.country}
                  {item.parish_state && ` • ${item.parish_state}`}
                </span>
              </div>
            ))}
          </article>

          <article className="mission-panel">
            <div className="mission-panel-header">
              <h3>Recent Community Partners</h3>
              <a href="/admin/volunteers">View all</a>
            </div>

            {recentVolunteers.data?.map((item, index) => (
              <div className="mission-record" key={index}>
                <strong>
                  {item.first_name} {item.last_name}
                </strong>
                <span>{item.email}</span>
              </div>
            ))}
          </article>

          <article className="mission-panel mission-panel-wide">
            <div className="mission-panel-header">
              <h3>Recent Connection Requests</h3>
              <a href="/admin/support">View all</a>
            </div>

            {recentSupport.data?.map((item, index) => (
              <div className="mission-record" key={index}>
                <strong>{item.first_name}</strong>
                <span>{item.request_details}</span>
              </div>
            ))}
          </article>
        </section>
      </section>
    </main>
  );
}
