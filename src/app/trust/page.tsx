import Link from "next/link";

const trustPages = [
  {
    title: "Privacy Policy",
    description:
      "Learn how we collect, protect, and responsibly use your information.",
    href: "/trust/privacy",
    icon: "🔒",
  },
  {
    title: "Community Standards",
    description:
      "The values and behaviours that guide every member of the Global Village.",
    href: "/trust/standards",
    icon: "❤️",
  },
  {
    title: "Safeguarding",
    description:
      "Our commitment to protecting children, families, and vulnerable persons.",
    href: "/trust/safeguarding",
    icon: "🛡️",
  },
  {
    title: "Terms of Use",
    description:
      "Understand your rights and responsibilities while using #RaiseThemRight.",
    href: "/trust/terms",
    icon: "📜",
  },
  {
    title: "AI & Human Connection",
    description:
      "Technology should strengthen human relationships—not replace them.",
    href: "/trust/ai-principles",
    icon: "🤝",
  },
  {
    title: "Our Commitment",
    description:
      "The promises we make to every family, Community Partner, and visitor.",
    href: "/trust/commitment",
    icon: "🌍",
  },
];

export default function TrustPage() {
  return (
    <main className="trust-page">
      <section className="trust-hero">
        <p className="eyebrow">TRUST CENTRE</p>

        <h1>Building Safe, Respectful and Meaningful Connections</h1>

        <p className="trust-intro">
          Every connection begins with trust. Everything we do is guided by our
          commitment to children, families, privacy, integrity, compassion and
          responsible stewardship of technology.
        </p>
      </section>

      <section className="trust-grid-section">
        <div className="trust-grid">
          {trustPages.map((page) => (
            <article className="trust-card" key={page.title}>
              <div className="trust-icon">{page.icon}</div>

              <h2>{page.title}</h2>

              <p>{page.description}</p>

              <Link href={page.href} className="button primary">
                Learn More
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-footer-message">
        <h2>Trust Is the Foundation of the Global Village</h2>

        <p>
          Families share their stories because they trust us. Community Partners
          volunteer because they believe in the mission. Every policy within our
          Trust Centre exists to protect people, encourage healthy relationships,
          and strengthen communities.
        </p>
      </section>
    </main>
  );
}
