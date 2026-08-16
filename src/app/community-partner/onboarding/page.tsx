import { requireMember } from "../../../lib/memberAuth";

export default async function CommunityPartnerOnboardingPage() {
  const { account } = await requireMember("community_partner");

  return (
    <main className="pledge-page">
      <section className="pledge-hero" style={{ textAlign: "center" }}>
        <p className="eyebrow">#RaiseThemRight Community</p>
        <h1 style={{ marginBottom: "0.25rem" }}>Welcome</h1>
        <p style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, margin: "0 auto 0.75rem", textAlign: "center" }}>
          {account.first_name}
        </p>
        <p style={{ textAlign: "center" }}>Your Community Partner account is ready for onboarding.</p>
      </section>

      <section className="pledge-card">
        <h2>Community Partner Onboarding</h2>
        <p>
          This is the protected Community Partner starting point. The next Phase 1 unit will build your support profile, service area, availability and verification journey here.
        </p>
        <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "12px", background: "#f7f4eb" }}>
          <strong>Parents receive the support.</strong>
          <p style={{ margin: "0.4rem 0 0" }}>
            #RaiseThemRight does not match Community Partners directly with children and does not permit independent partner-to-child communication.
          </p>
        </div>
      </section>
    </main>
  );
}
