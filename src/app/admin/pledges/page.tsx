import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { requireAdmin } from "../../../lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function PledgesPage() {
  await requireAdmin();

  const { data: pledges } = await supabaseAdmin
    .from("pledges")
    .select("id, first_name, last_name, email, country, parish_state, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="mission-page">
      <aside className="mission-sidebar">
        <div>
          <p className="mission-brand">#RaiseThemRight</p>
          <h2>Mission Control</h2>
        </div>

        <nav className="mission-nav">
          <a href="/admin">Dashboard</a>
          <a href="/admin/pledges" className="active">Pledges</a>
          <a href="/admin/volunteers">Community Partners</a>
          <a href="/admin/support">Connection Requests</a>
          <a href="/admin/analytics">Analytics</a>
          <a href="/admin/export">Export</a>
        </nav>

        <form action="/api/admin/logout" method="post">
          <button className="button secondary" type="submit">Sign Out</button>
        </form>

        <a className="mission-return" href="/">
          Return to Website
        </a>
      </aside>

      <section className="mission-main">
        <header className="mission-top">
          <div>
            <p className="eyebrow">Mission Control</p>
            <h1>Pledges</h1>
            <p>View everyone who has taken the #RaiseThemRight pledge.</p>
          </div>
        </header>

        <section className="mission-table-card">
          <table className="mission-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Parish / State</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {pledges?.map((pledge) => (
                <tr key={pledge.id}>
                  <td>
                    {pledge.first_name} {pledge.last_name}
                  </td>
                  <td>{pledge.email}</td>
                  <td>{pledge.country}</td>
                  <td>{pledge.parish_state}</td>
                  <td>
                    {new Date(pledge.created_at).toLocaleDateString("en-JM")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}
