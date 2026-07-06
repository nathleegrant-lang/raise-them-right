import Link from "next/link";

const trustPages = [
  {
    title: "Privacy Policy",
    description:
      "How we collect, protect, and responsibly use your information.",
    href: "/trust/privacy",
    icon: "🔒",
    button: "Read Policy",
  },
  {
    title: "Community Standards",
    description:
      "The values and behaviours expected within the Global Village.",
    href: "/trust/standards",
    icon: "❤️",
    button: "View Standards",
  },
  {
    title: "Safeguarding",
    description:
      "Our commitment to protecting children, families, and vulnerable persons.",
    href: "/trust/safeguarding",
    icon: "🛡️",
    button: "Learn About Safety",
  },
  {
    title: "Terms of Use",
    description:
      "The responsibilities that guide safe and respectful use of the platform.",
    href: "/trust/terms",
    icon: "📜",
    button: "Read Terms",
  },
  {
    title: "AI & Human Connection",
    description:
      "How technology supports relationships without replacing human care.",
    href: "/trust/ai-principles",
    icon: "🤝",
    button: "Explore Principles",
  },
  {
    title: "Our Commitment",
    description:
      "The promise we make to families, Community Partners, and visitors.",
    href: "/trust/commitment",
    icon: "🌍",
    button: "Read Our Promise",
  },
];

export default function TrustPage() {
  return (
    <main className="trust-page">
      <section className="trust-hero">
        <p className="eyebrow">Trust Centre</p>

        <h1>Building Safe, Respectful and Meaningful Connections</h1>

        <p className="trust-intro">
          Families share their stories because they trust us. Community Partners
          step forward because they believe every child deserves a village.
          Everything we do is guided by our commitment to children, families,
          integrity, compassion, privacy, and the responsible use of technology.
        </p>
      </section>

      <section className="trust-promise">
        <p className="eyebrow">Our Promise</p>

        <h2>
          We believe rebuilding the Global Village begins by protecting the
          people who live within it.
        </h2>

        <span className="brush-divider trust-divider" />

        <p>
          Every policy below exists for one reason: to help children, families,
          and communities flourish safely.
        </p>
      </section>

      <section className="trust-grid-section">
        <div className="trust-section-heading">
          <p className="eyebrow">Explore the Trust Centre</p>

          <h2>Principles that guide every connection.</h2>

          <p>
            These guiding principles shape every interaction, every partnership,
            and every connection made through #RaiseThemRight.
          </p>
        </div>

        <div className="trust-grid">
          {trustPages.map((page) => (
            <article className="trust-card" key={page.title}>
              <div className="trust-icon">{page.icon}</div>

              <h3>{page.title}</h3>

              <p>{page.description}</p>

              <Link href={page.href} className="button primary">
                {page.button}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="trust-closing">
        <h2>Trust Is How Villages Are Built</h2>

        <p>
          Policies alone do not build trust. People do. These principles simply
          help us protect the relationships that make the Global Village
          possible.
        </p>

        <div className="trust-values">
          <p>Every family deserves to feel safe.</p>
          <p>Every Community Partner deserves clear guidance.</p>
          <p>Every child deserves adults they can trust.</p>
        </div>

        <strong>That is our promise.</strong>
      </section>

      <section className="trust-identity">
        <h2>#RaiseThemRight</h2>
        <p>A Public Awareness Initiative by Nathlee R. Grant</p>
        <strong>Strong Homes. Strong Children. Strong Nation.</strong>
      </section>
    </main>
  );
}
