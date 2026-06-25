export default function JoinPage() {
  const roles = [
    "Prayer Partner",
    "Mentor",
    "Community Champion",
    "Parent Advocate",
    "Faith Partner",
    "Professional Support",
  ];

  return (
    <main className="join-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/pledge">Take the Pledge</a>
        <a href="/#resources">Resources</a>
        <a href="/#join">Contact</a>
      </nav>

      <section className="join-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>Join The Movement</h1>
        <p>
          Strong homes are built one relationship at a time. Join us as we support
          parents, strengthen communities, and invest in the next generation.
        </p>
      </section>

      <section className="join-movement-card">
        <h2>How would you like to serve?</h2>

        <div className="serve-grid">
          {roles.map((role) => (
            <div className="serve-card" key={role}>
              <h3>{role}</h3>
              <p>
                Help strengthen homes, encourage families, and support children
                through your time, experience, prayer, or professional skills.
              </p>
            </div>
          ))}
        </div>

        <form className="movement-form" action="/thank-you-join">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <input type="text" placeholder="Country" />
          <input type="text" placeholder="Parish / State" />

          <textarea placeholder="Tell us how you would like to serve, or share your experience/skills." />

          <button type="submit" className="button primary">
            Join The Movement
          </button>
        </form>
      </section>
    </main>
  );
}
