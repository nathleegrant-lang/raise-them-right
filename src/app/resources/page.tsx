export default function ResourcesPage() {
  const resources = [
    {
      title: "Parenting Encouragement",
      description:
        "Faith-filled support for parents and caregivers who are building strong homes with patience, wisdom, and love.",
      buttonLabel: "View Resources",
    },
    {
      title: "Prayer & Faith",
      description:
        "Simple prayer prompts, biblical encouragement, and spiritual reminders for families and Community Partners.",
      buttonLabel: "View Resources",
    },
    {
      title: "Community Building",
      description:
        "Guidance for strengthening the Global Village through trust, encouragement, shared responsibility, and local connection.",
      buttonLabel: "View Resources",
    },
    {
      title: "Family Conversation Starters",
      description:
        "Thoughtful questions and discussion ideas to help families listen well, talk openly, and grow closer together.",
      buttonLabel: "View Resources",
    },
    {
      title: "Youth & Mentorship",
      description:
        "Encouragement for mentoring children, teenagers, and young adults with wisdom, consistency, and care.",
      buttonLabel: "View Resources",
    },
    {
      title: "Safety & Trust",
      description:
        "Practical reminders for privacy-conscious connections, healthy boundaries, and safe community support.",
      buttonLabel: "View Resources",
    },
  ];
  return (
    <main className="resources-page">

      <section className="resources-hero">
        <p className="eyebrow">#RaiseThemRight</p>

        <h1>Resources</h1>

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
                {resource.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
