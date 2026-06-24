export default function ResourcesPage() {
  const resources = [
    {
      title: "Parenting Basics",
      description:
        "Practical guidance for building strong relationships, discipline, communication, and trust.",
    },
    {
      title: "Faith in the Home",
      description:
        "Ideas and encouragement for introducing prayer, faith, and biblical values at home.",
    },
    {
      title: "Character Building",
      description:
        "Teaching honesty, responsibility, kindness, perseverance, and respect.",
    },
    {
      title: "Supporting Teenagers",
      description:
        "Helping teenagers navigate identity, peer pressure, education, and decision-making.",
    },
    {
      title: "Community & Mentorship",
      description:
        "How communities can support families and positively influence children.",
    },
    {
      title: "Recommended Resources",
      description:
        "Books, articles, videos, and organizations that strengthen families and communities.",
    },
  ];

  return (
    <main className="resources-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/pledge">Take the Pledge</a>
        <a href="/join">Join</a>
        <a href="/support">Find Support</a>
      </nav>

      <section className="resources-hero">
        <p className="eyebrow">#RaiseThemRight</p>

        <h1>Parenting Resources</h1>

        <p>
          Practical tools, encouragement, and guidance to help strengthen homes,
          support parents, and invest in the next generation.
        </p>
      </section>

      <section className="resources-card">
        <h2>Browse Resources</h2>

        <p className="resources-intro">
          These resources are designed to encourage, equip, and support
          parents, caregivers, mentors, churches, and communities.
        </p>

        <div className="resource-grid">
          {resources.map((resource) => (
            <div className="resource-card" key={resource.title}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>

              <button className="button primary">
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
