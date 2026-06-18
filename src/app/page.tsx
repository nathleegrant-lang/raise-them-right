import {
  BookOpen,
  Church,
  HeartHandshake,
  Home,
  Megaphone,
  ShieldCheck,
  Users,
  GraduationCap,
  Mail,
  Camera,
  Facebook,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const beliefs = [
  "Parents carry the primary responsibility for raising children.",
  "Parents should not have to raise children alone.",
  "Every adult influences children, whether intentionally or not.",
  "Faith, values, discipline, love, and community all help shape the next generation.",
  "Support must never replace parental responsibility; it should strengthen it.",
];

const communityRoles = [
  "Bus and taxi operators",
  "Shopkeepers and business owners",
  "Teachers and school leaders",
  "Churches and faith communities",
  "Coaches, mentors, and neighbours",
  "Parents, grandparents, and guardians",
];

const futureTraining = [
  "Parent Academy courses",
  "Community ambassador training",
  "Youth mentorship resources",
  "Downloadable worksheets and guides",
  "Quizzes and reflection activities",
  "Certificates and participant tracking",
];

const flyers = [
  {
    title: "#GetBackTheCommunity",
    text: "Children are influenced by more than their parents. Every word, action, and example matters.",
  },
  {
    title: "You May Think It Doesn't Matter",
    text: "The music you play, the words you speak, and the example you set are teaching children something.",
  },
  {
    title: "Support, Not Replacement",
    text: "Parents need support, but their role and responsibility must remain clear.",
  },
];

export default function HomePage() {
  return (
    <main>
      <header className="siteHeader">
        <a href="#home" className="brand" aria-label="#RaiseThemRight Home">
          <span className="brandMark">RT</span>
          <span>#RaiseThemRight</span>
        </a>
        <nav className="navLinks" aria-label="Main navigation">
          <a href="#movement">Movement</a>
          <a href="#community">Community</a>
          <a href="#training">Training</a>
          <a href="#join">Join</a>
        </nav>
      </header>

      <section id="home" className="hero sectionPad">
        <div className="heroText">
          <p className="eyebrow">A Public Awareness Initiative by Nathlee R. Grant</p>
          <h1>Strong Homes. Strong Children. Strong Nation.</h1>
          <p className="heroLead">
            #RaiseThemRight calls families, communities, schools, churches, and everyday citizens to recognize their influence in shaping the next generation.
          </p>
          <div className="buttonRow">
            <a className="primaryButton" href="#join">
              Join the Movement <ArrowRight size={18} />
            </a>
            <a className="secondaryButton" href="#movement">Learn More</a>
          </div>
        </div>
        <div className="heroCard" aria-label="Campaign message card">
          <div className="heroCardTop">
            <Megaphone size={34} />
            <span>Coming Soon</span>
          </div>
          <h2>Over the coming weeks...</h2>
          <p>
            We will explore the role that homes, families, communities, faith, and personal responsibility play in shaping children.
          </p>
          <div className="pillGrid">
            <span>Homes</span><span>Families</span><span>Communities</span><span>Faith</span><span>Responsibility</span>
          </div>
        </div>
      </section>

      <section id="movement" className="sectionPad lightSection">
        <div className="sectionIntro">
          <p className="eyebrow">The Movement</p>
          <h2>The importance of community</h2>
          <p>
            Children are shaped by far more than what happens inside their homes. They are always watching, listening, and learning from the world around them.
          </p>
        </div>
        <div className="twoColumn">
          <div className="storyBox">
            <h3>Why this matters</h3>
            <p>
              Parents bear the primary responsibility for raising children, but they were never meant to carry the burden alone. Healthy communities help children grow, thrive, and become responsible citizens.
            </p>
            <p>
              The question is not whether we are influencing children. The question is what we are teaching them.
            </p>
          </div>
          <div className="scriptureBox">
            <BookOpen size={32} />
            <h3>A generation must be taught</h3>
            <p>
              The Bible reminds us that a generation arose that did not know God. What children know is the responsibility of the present generation.
            </p>
          </div>
        </div>
      </section>

      <section className="sectionPad">
        <div className="sectionIntro narrow">
          <p className="eyebrow">What We Believe</p>
          <h2>Support is not replacement</h2>
        </div>
        <div className="beliefGrid">
          {beliefs.map((belief) => (
            <div className="beliefCard" key={belief}>
              <CheckCircle2 size={22} />
              <p>{belief}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="community" className="sectionPad navySection">
        <div className="sectionIntro">
          <p className="eyebrow goldText">#GetBackTheCommunity</p>
          <h2>Each of us leaves an imprint</h2>
          <p>
            Sometimes people believe their actions are insignificant because parents should be doing their job. But every adult who interacts with children helps shape what they see as normal, acceptable, and worth repeating.
          </p>
        </div>
        <div className="roleGrid">
          {communityRoles.map((role) => (
            <div className="roleCard" key={role}>{role}</div>
          ))}
        </div>
      </section>

      <section className="sectionPad">
        <div className="sectionIntro">
          <p className="eyebrow">Resources</p>
          <h2>Flyers and campaign messages</h2>
          <p>Use these as starting points for social media posts, community talks, school discussions, and church engagement.</p>
        </div>
        <div className="flyerGrid">
          {flyers.map((flyer) => (
            <article className="flyerCard" key={flyer.title}>
              <h3>{flyer.title}</h3>
              <p>{flyer.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="training" className="sectionPad lightSection">
        <div className="sectionIntro">
          <p className="eyebrow">Coming Next</p>
          <h2>Built to expand into training</h2>
          <p>
            This first website can grow into a training hub for parents, community ambassadors, schools, churches, and volunteers.
          </p>
        </div>
        <div className="trainingGrid">
          {futureTraining.map((item, index) => (
            <div className="trainingItem" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="join" className="sectionPad joinSection">
        <div className="joinCard">
          <div>
            <p className="eyebrow">Join the Movement</p>
            <h2>Let us play our part well.</h2>
            <p>
              Follow, share the messages, encourage a parent, mentor a child, support a school, serve in your community, and help raise them right.
            </p>
          </div>
          <div className="contactCard">
            <a href="mailto:nathlee_grant@yahoo.com"><Mail size={20} /> nathlee_grant@yahoo.com</a>
            <a href="https://www.instagram.com/nathlee.grant/" target="_blank" rel="noreferrer"><Instagram size={20} /> @nathlee.grant</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><Facebook size={20} /> Nathlee Grant</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p><strong>#RaiseThemRight</strong> — A Public Awareness Initiative by Nathlee R. Grant</p>
        <p>Strong Homes. Strong Children. Strong Nation.</p>
      </footer>
    </main>
  );
}
