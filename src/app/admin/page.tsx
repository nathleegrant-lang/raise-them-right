import { supabase } from "../../lib/supabase";

export default async function AdminPage() {
  const { count: pledgeCount } = await supabase
    .from("pledges")
    .select("*", { count: "exact", head: true });

  const { count: volunteerCount } = await supabase
    .from("volunteers")
    .select("*", { count: "exact", head: true });

  const { count: supportCount } = await supabase
    .from("support_requests")
    .select("*", { count: "exact", head: true });

  return (
    <main className="admin-page">
      <section className="admin-header">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>Mission Control</h1>
        <p>Monitor pledges, volunteers, and support requests in one place.</p>
      </section>

      <section className="admin-grid">
        <div className="admin-card">
          <h2>{pledgeCount ?? 0}</h2>
          <p>Pledges</p>
        </div>

        <div className="admin-card">
          <h2>{volunteerCount ?? 0}</h2>
          <p>Volunteers</p>
        </div>

        <div className="admin-card">
          <h2>{supportCount ?? 0}</h2>
          <p>Support Requests</p>
        </div>
      </section>
    </main>
  );
}
