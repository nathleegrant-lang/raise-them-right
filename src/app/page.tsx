import Image from "next/image";

const beliefs = [
  "Every child deserves a strong village.",
  "Strong families create strong communities.",
  "No family should walk alone.",
  "Every person has something valuable to give.",
  "Technology should strengthen human connection.",
];

export default function Home() {
  return (
    <main>
      <section id="top" className="hero-section">
        <div className="hero-image-wrap">
          <Image
            src="/images/raise-them-right-hero.jpg"
            alt="A warm community scene with adults and children."
            fill
            priority
            className="hero-image"
          />
          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow">#RaiseThemRight</p>
            <h1>
              Rebuilding the<br />
              Global Village
            </h1>
            <p>
              Strengthening the people who raise children through faith,
              family, community, and meaningful connections.
            </p>

            <div className="hero-actions">
              <a href="/pledge" className="button primary">Take the Pledge</a>
              <a href="/about" className="button secondary">Our Foundation</a>
            </div>
          </div>
        </div>
      </section>

      <section className="action-section">
        <p className="eyebrow">Choose Your Door Into The Village</p>
        <h2>How would you like to be part of the village?</h2>

        <p className="action-intro">
          Whether you are ready to stand with the vision, serve as a Community
          Partner, or connect with someone who can walk alongside you, there is
          a place for you here.
        </p>

        <div className="action-grid three">
          <div className="action-card">
            <h3>Take the Pledge</h3>
            <p>
              Stand with the vision and commit to strengthening the people who
              raise children.
            </p>
            <a href="/pledge" className="button primary">Take the Pledge</a>
          </div>

          <div className="action-card">
            <h3>Become a Community Partner</h3>
            <p>
              Share your encouragement, prayer, mentorship, experience, or
              professional expertise with families seeking connection.
            </p>
            <a href="/join" className="button primary">Become a Partner</a>
          </div>

          <div className="action-card">
            <h3>Connect with a Community Partner</h3>
            <p>
              No family should walk alone. Connect with someone ready to listen,
              encourage, and walk alongside you.
            </p>
            <a href="/support" className="button primary">Connect Today</a>
          </div>
        </div>
      </section>

      <section className="section community-section">
        <div className="image-panel wide">
          <Image
            src="/images/get-back-the-community.jpg"
            alt="A global montage of adults and children in community."
            width={1600}
            height={1000}
          />
        </div>

        <div className="section-copy">
          <p className="eyebrow">Why We Exist</p>
          <h2>It still takes a village.</h2>
          <span className="brush-divider" />
          <p>
            Children are shaped by far more than their parents. Every
            conversation, every act of kindness, every lesson, and every example
            leaves a mark.
          </p>
          <p>
            For generations, communities naturally surrounded families with
            encouragement, wisdom, accountability, and support. Many families
            today walk that journey alone.
          </p>
          <p>
            #RaiseThemRight exists to help rebuild those connections — one
            meaningful connection at a time.
          </p>
        </div>
      </section>

      <section className="belief-section">
        <div className="belief-inner">
          <p className="eyebrow light">What We Believe</p>
          <h2>Strong homes are strengthened by strong communities.</h2>

          <div className="belief-list">
            {beliefs.map((belief) => (
              <div className="belief-item" key={belief}>
                {belief}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section support-section">
        <div className="section-copy">
          <p className="eyebrow">No Family Should Walk Alone</p>
          <h2>There is a place for you here.</h2>
          <span className="brush-divider" />
          <p>
            Whether you are looking for encouragement or you are ready to
            encourage someone else, the village grows stronger when people
            choose to connect.
          </p>

          <div className="hero-actions">
            <a href="/join" className="button primary">Become a Community Partner</a>
            <a href="/support" className="button secondary">Connect with a Partner</a>
          </div>
        </div>

        <div className="image-panel">
          <Image
            src="/images/parents-need-support.jpg"
            alt="Parents and children spending meaningful time together."
            width={1600}
            height={1000}
          />
        </div>
      </section>
    </main>
  );
}
