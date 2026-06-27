export default function AboutPage() {
  return (
    <main className="about-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/pledge">Take the Pledge</a>
        <a href="/join">Become a Community Partner</a>
        <a href="/support">Connect</a>
      </nav>

      <section className="about-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>Our Foundation</h1>
        <p>
          Rebuilding the global village by strengthening the people who raise children.
        </p>
      </section>

      <section className="about-card">
        <h2>Rebuilding the Global Village</h2>
        <p>
          Children have never been raised by parents alone. Families are strengthened by grandparents,
          neighbours, teachers, faith communities, mentors, coaches, and trusted friends.
        </p>
        <p>
          #RaiseThemRight exists because we believe it is time to rebuild that village —
          not by replacing parents, but by strengthening the people who raise children.
        </p>

        <div className="about-highlight">
          <h3>Our Mission</h3>
          <p>Strengthening the people who raise children.</p>
        </div>

        <div className="about-highlight">
          <h3>Our Vision</h3>
          <p>Rebuilding the global village, one connection at a time.</p>
        </div>

        <h2>What We Believe</h2>

        <div className="about-belief-grid">
          <div>
            <h3>Every child deserves a strong village.</h3>
            <p>Every caring adult has the opportunity to shape a child’s future through words, actions, and example.</p>
          </div>

          <div>
            <h3>Strong families create strong communities.</h3>
            <p>When families are strengthened, communities become safer, more compassionate, and more resilient.</p>
          </div>

          <div>
            <h3>No family should walk alone.</h3>
            <p>Seeking encouragement is not weakness. Offering encouragement is part of rebuilding the village.</p>
          </div>

          <div>
            <h3>Every person has something valuable to give.</h3>
            <p>Some mentor. Some pray. Some teach. Some simply listen. Every contribution matters.</p>
          </div>
        </div>

        <h2>Community Partners</h2>
        <p>
          Community Partners are individuals who offer time, encouragement, experience,
          prayer, mentorship, or professional expertise to strengthen families and support
          those raising children.
        </p>

        <h2>Our AI Promise</h2>
        <p>
          Artificial Intelligence serves people. It does not replace people. AI quietly
          works behind the scenes to help identify appropriate Community Partners,
          recommend trusted resources, protect privacy, and encourage safe, meaningful connections.
        </p>

        <h2>The Global Village</h2>
        <p>
          The village has never disappeared. It has simply become disconnected.
          #RaiseThemRight exists to reconnect it.
        </p>

        <p className="signature">
          — Nathlee R. Grant<br />
          Founder, #RaiseThemRight
        </p>
      </section>
    </main>
  );
}
