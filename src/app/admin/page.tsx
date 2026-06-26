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

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <div className="admin-header">
          <p className="eyebrow">#RaiseThemRight</p>
          <h1>Mission Control</h1>
          <p>Monitor pledges, volunteers, and support requests in one place.</p>
        </div>

        <div className="admin-grid">
          <div className="admin-card">
            <h2>{pledgeCount.count ?? 0}</h2>
            <p>Pledges</p>
          </div>

          <div className="admin-card">
            <h2>{volunteerCount.count ?? 0}</h2>
            <p>Volunteers</p>
          </div>

          <div className="admin-card">
            <h2>{supportCount.count ?? 0}</h2>
            <p>Support Requests</p>
          </div>
        </div>

        <div className="admin-lists">
          <section className="admin-list-card">
            <h3>Recent Pledges</h3>
            {recentPledges.data?.map((item, index) => (
              <p key={index}>
                <strong>{item.first_name} {item.last_name}</strong><br />
                {item.country} {item.parish_state && `• ${item.parish_state}`}
              </p>
            ))}
          </section>

          <section className="admin-list-card">
            <h3>Recent Volunteers</h3>
            {recentVolunteers.data?.map((item, index) => (
              <p key={index}>
                <strong>{item.first_name} {item.last_name}</strong><br />
                {item.email}
              </p>
            ))}
          </section>

          <section className="admin-list-card">
            <h3>Recent Support Requests</h3>
            {recentSupport.data?.map((item, index) => (
              <p key={index}>
                <strong>{item.first_name}</strong><br />
                {item.request_details}
              </p>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
