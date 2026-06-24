export default function SupportPage() {
  return (
    <main className="support-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/pledge">Take the Pledge</a>
        <a href="/join">Join</a>
        <a href="/#resources">Resources</a>
      </nav>

      <section className="support-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>Find Support</h1>
        <p>
          No parent should have to feel alone. Whether you need prayer,
          parenting guidance, mentorship, or referral support, this is a place
          to begin.
        </p>
      </section>

      <section className="support-card">
        <h2>How can we support you?</h2>

        <div className="serve-grid">
          <div className="serve-card">
            <h3>Prayer Request</h3>
            <p>Share a prayer need for your child, family, home, or community.</p>
          </div>

          <div className="serve-card">
            <h3>Parenting Guidance</h3>
            <p>Ask for support with behaviour, communication, school issues, or family challenges.</p>
          </div>

          <div className="serve-card">
            <h3>Mentorship</h3>
            <p>Request mentorship support for a child, teen, parent, or young adult.</p>
          </div>

          <div className="serve-card">
            <h3>Referral Support</h3>
            <p>Connect with trusted counselling, church, or community support services where possible.</p>
          </div>
        </div>

        <form className="movement-form">
          <input type="text" placeholder="First Name" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Country" />
          <input type="text" placeholder="Parish / State" />
          <textarea placeholder="Briefly share the support you are seeking." />

          <button type="submit" className="button primary">
            Request Support
          </button>
        </form>
      </section>
    </main>
  );
}
