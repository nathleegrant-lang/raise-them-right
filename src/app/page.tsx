import Image from "next/image";

const roles = [
  "Parents",
  "Teachers",
  "Coaches",
  "Neighbours",
  "Faith communities",
  "Business owners",
  "Bus and taxi operators",
  "Community mentors",
];

const beliefs = [
  "Parents carry the primary responsibility for raising children.",
  "Children are shaped by more than what happens inside their homes.",
  "Every adult influences children through words, actions, attitudes, and example.",
  "Faith, family, community, and responsibility help form strong character.",
  "Support should strengthen parents, not replace them.",
];

const pillars = [
  { title: "Strong Homes", text: "The first place children learn love, discipline, faith, and character." },
  { title: "Strong Communities", text: "The village around the child must become safe, caring, and intentional." },
  { title: "Strong Nation", text: "When children are raised well, the future of the nation is strengthened." },
];

function BrushDivider() {
  return <span className="brush-divider" aria-hidden="true" />;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="#RaiseThemRight home">
          <Image
            src="/images/raisethemright-logo-primary.png"
            alt="#RaiseThemRight - Strong Homes. Strong Children. Strong Nation."
            width={900}
            height={360}
            priority
          />
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#movement">Movement</a>
          <a href="#community">Community</a>
          <a href="#resources">Resources</a>
          <a href="#join">Join</a>
        </nav>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-image-wrap">
          <Image
            src="/images/raise-them-right-hero.jpg"
            alt="A warm community scene with children, a parent, a shopkeeper, and a transport operator interacting positively."
            fill
            priority
            className="hero-image"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">A Public Awareness Initiative by Nathlee R. Grant</p>
            <h1>It takes a community to raise a child.</h1>
            <p>
              Children are always watching, always listening, and always learning.
              #RaiseThemRight is a call for all of us to play our part well.
            </p>
            <div className="hero-actions">
              <a href="#join" className="button primary">Join the Movement</a>
              <a href="#movement" className="button secondary">Read the Message</a>
            </div>
          </div>
        </div>
      </section>

     <section id="movement" className="section founder-section founder-stacked">
  <div className="founder-image-card">
    <Image
      src="/images/nathlee-r-grant-founder.png"
      alt="Nathlee R. Grant, founder of #RaiseThemRight."
      width={520}
      height={760}
      className="founder-image"
    />
  </div>

  <div className="section-copy founder-copy">
    <p className="eyebrow">Founder&apos;s Message</p>
    <h2>A message from Nathlee R. Grant</h2>
    <BrushDivider />
          <p>
            Throughout the month of May, we celebrated our children. We applauded their achievements, recognized their potential, and reminded ourselves that they are the future of our nation.
          </p>
          <p>
            But as Child Month comes to a close, one truth remains:
          </p>
          <p>
           Children do not raise themselves.
          </p>
           <p> 
             #RaiseThemRight is a call to parents, guardians, families, communities, and every adult who influences a child.</p>

  <p> Parents carry the primary responsibility for raising their children. Long before society speaks to a child, the home teaches lessons about love, discipline, respect, responsibility, identity, and faith. Strong homes remain the foundation upon which strong children are built.
 </p>
  <p> Yet as I began writing the messages that would become #RaiseThemRight, I found myself reflecting on something many of us overlook: children are influenced by more than their parents. </p>

  <p> Every day they are watching, listening, and learning from the adults around them. </p>

  <p> The bus driver. The taxi operator. The teacher. The neighbour. The shopkeeper. The coach. The church member. </p>

  <p> Each of us leaves an imprint. </p>

  <p> Sometimes we blame society for influencing our children. The reality is that society is not some distant force. Society is us. It is the collective example set by the adults children encounter every day. </p>

  <p> When homes are strong, harmful influences lose much of their power. When communities support parents, children are surrounded by consistent messages that reinforce character, responsibility, and hope. </p>

  <p> #RaiseThemRight is therefore a call to reclaim parental responsibility while rebuilding the communities that help children thrive. </p>

  <p> No parent should have to raise a child alone. </p>

  <p> No community should ignore its influence on the next generation. </p>

  <p> What children know, value, and become is the responsibility of the present generation. </p>

  <p> Let us play our part well.
           </p>  
          <p className="signature">— Nathlee R. Grant</p>
        </div>
      </section>

      <section className="quote-band">
        <div>
          <p>The question is not whether we influence children.</p>
          <h2>The question is what are we teaching them?</h2>
        </div>
      </section>

      <section id="community" className="section community-section">
        <div className="image-panel wide">
          <Image
            src="/images/get-back-the-community.jpg"
            alt="A global montage of adults from different communities positively interacting with children."
            width={1600}
            height={1000}
          />
        </div>
        <div className="section-copy">
          <p className="eyebrow">Get Back The Community</p>
          <h2>Every adult leaves an imprint.</h2>
          <BrushDivider />
          <p>
            Children interact with many people in the course of their day. From the ride to school, to the conversations they hear, to the examples they see, our words, actions, and attitudes help shape the children around us.
          </p>
          <div className="role-grid">
            {roles.map((role) => <span key={role}>{role}</span>)}
          </div>
        </div>
      </section>

      <section className="section support-section">
        <div className="section-copy">
          <p className="eyebrow">Parents Need Support. Not Replacement.</p>
          <h2>No parent should have to feel alone.</h2>
          <BrushDivider />
          <p>
            Parents carry the primary responsibility for raising children. Support should never confuse or replace that responsibility. Instead, communities should come alongside parents with encouragement, guidance, safe spaces, and positive examples.
          </p>
          <p>
            The goal is not to take over the role of parents. The goal is to strengthen the village around the child.
          </p>
        </div>
        <div className="image-panel">
          <Image
            src="/images/parents-need-support.jpg"
            alt="A mother helping her son and a father helping his daughter with learning at home."
            width={1600}
            height={1000}
          />
        </div>
      </section>

      <section className="belief-section">
        <div className="belief-inner">
          <p className="eyebrow light">What We Believe</p>
          <h2>Strong homes are strengthened by strong communities.</h2>
          <div className="belief-list">
            {beliefs.map((item) => <div key={item} className="belief-item">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section faith-section">
        <div className="image-panel">
          <Image
            src="/images/faith-and-family.jpg"
            alt="A family gathered in prayer around an open Bible in a warm home setting."
            width={1600}
            height={1000}
          />
        </div>
        <div className="section-copy">
          <p className="eyebrow">Faith and Family</p>
          <h2>Faith helps shape what children know, value, and become.</h2>
          <BrushDivider />
          <p>
            The Bible tells us that a generation arose that did not know God because the generation before them did not tell them about Him. What children know is the responsibility of the present generation.
          </p>
          <p>
            #RaiseThemRight encourages homes and communities to pass on faith, character, wisdom, and responsibility with love and consistency.
          </p>
        </div>
      </section>

      <section id="resources" className="pillars-section">
        <p className="eyebrow">Movement Pillars</p>
        <h2>From the home to the nation.</h2>
        <div className="pillars-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <BrushDivider />
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="join" className="join-section">
        <div className="join-card">
          <p className="eyebrow">Join The Movement</p>
          <h2>Let us play our part well.</h2>
          <p>
            Follow the journey, share the message, encourage a parent, mentor a child, and help build the kind of community our children deserve.
          </p>
          <div className="join-actions">
            <a className="button primary" href="mailto:nathlee_grant@yahoo.com">Contact Nathlee</a>
            <a className="button secondary" href="https://www.instagram.com/nathlee.grant/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <Image
          src="/images/raisethemright-logo-primary.png"
          alt="#RaiseThemRight logo"
          width={520}
          height={220}
        />
        <p>A Public Awareness Initiative by Nathlee R. Grant</p>
        <p>Strong Homes. Strong Children. Strong Nation.</p>
      </footer>
    </main>
  );
}
