import Link from "next/link";
import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function CommunityPartnerOnboardingPage() {
  const { account, user } = await requireMember("community_partner");
  const { data: profile } = await supabaseAdmin
    .from("community_partner_profiles")
    .select("profile_complete, verification_status")
    .eq("user_id", user.id)
    .maybeSingle();
  const profileComplete = Boolean(profile?.profile_complete);
  const verificationStatus = profile?.verification_status || "not_started";

  const cardStyle = {
    border: "1px solid rgba(11, 29, 58, 0.14)",
    borderRadius: "16px",
    padding: "1.25rem",
    background: "#fffdf7",
  } as const;

  const verificationLabel = verificationStatus === "verified" ? "Verified" : verificationStatus === "pending" ? "Verification pending" : verificationStatus === "declined" ? "Verification needs attention" : "Verification not started";

  return (
    <main className="pledge-page">
      <section className="pledge-hero" style={{ textAlign: "center" }}>
        <p className="eyebrow">#RaiseThemRight Community</p>
        <h1 style={{ marginBottom: "0.25rem" }}>Welcome</h1>
        <p style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontFamily: '"Segoe Script", "Brush Script MT", cursive', fontWeight: 400, fontStyle: "italic", margin: "0 auto 0.75rem", textAlign: "center" }}>
          {account.first_name}
        </p>
        <p style={{ textAlign: "center" }}>Your Community Partner home.</p>
      </section>

      <section className="pledge-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
          <div><h2 style={{ marginBottom: "0.25rem" }}>Community Partner Home</h2><p style={{ margin: 0 }}>Manage your support profile and prepare for the verification journey.</p></div>
          <MemberSignOut />
        </div>

        <div role="note" style={{ padding: "1.15rem 1.25rem", borderRadius: "12px", background: "#fff8e7", border: "1px solid #f2b632", borderLeft: "5px solid #f2b632", marginBottom: "1.5rem", color: "#13213a" }}>
          <strong style={{ display: "block", fontSize: "1.05rem" }}>A quick safety reminder</strong>
          <p style={{ margin: "0.4rem 0 0", lineHeight: 1.5 }}>Community Partners support parents and families. #RaiseThemRight does not independently match Community Partners with children or permit direct partner-to-child communication.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          <div style={cardStyle}>
            <p className="eyebrow">MY PROFILE</p>
            <h3>{profileComplete ? "Profile ready" : "Complete your profile"}</h3>
            <p>{profileComplete ? "Review or update how, where and when you can support parents and families." : "Tell us the types of adult-to-adult support you can appropriately offer."}</p>
            <Link href="/community-partner/profile" className="button primary">{profileComplete ? "View My Profile" : "Complete My Profile"}</Link>
          </div>

          <div style={cardStyle}>
            <p className="eyebrow">VERIFICATION</p>
            <h3>{verificationLabel}</h3>
            <p>Verification will be required before a Community Partner can participate in future support opportunities. The verification workflow has not been activated yet.</p>
            <span style={{ display: "inline-block", fontWeight: 700, color: "#5f6b7a" }}>Coming next</span>
          </div>

          <div style={cardStyle}>
            <p className="eyebrow">SUPPORT OPPORTUNITIES</p>
            <h3>Parent Support Opportunities</h3>
            <p>Appropriate opportunities will eventually appear here only after the safety, verification and support-request workflows are certified.</p>
            <span style={{ display: "inline-block", fontWeight: 700, color: "#5f6b7a" }}>Not active yet</span>
          </div>
        </div>
      </section>
    </main>
  );
}
