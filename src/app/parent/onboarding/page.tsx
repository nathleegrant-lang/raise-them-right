import { requireMember } from "../../../lib/memberAuth";

export default async function ParentOnboardingPage() {
  const { account } = await requireMember("parent");

  return (
    <main className="pledge-page">
      <section className="pledge-hero">
        <p className="eyebrow">#RaiseThemRight Community</p>
        <h1>Welcome, {account.first_name}.</h1>
        <p>Your Parent account is ready for onboarding.</p>
      </section>

      <section className="pledge-card">
        <h2>Parent Onboarding</h2>
        <p>
          This is the protected Parent starting point. The next Phase 1 unit will build your Parent profile and support-request journey here.
        </p>
        <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "12px", background: "#f7f4eb" }}>
          <strong>Child privacy remains protected.</strong>
          <p style={{ margin: "0.4rem 0 0" }}>
            Do not enter a child's full name, photograph, school, exact age, home address, telephone number, or other identifying information.
          </p>
        </div>
      </section>
    </main>
  );
}
