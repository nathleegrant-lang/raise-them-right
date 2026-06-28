export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        

        <div className="footer-links">
          <h3>Explore</h3>
          <p>
          <a href="/">Home</a>
          <a href="/about">Foundation</a>
          <a href="/pledge">Pledge</a>
          <a href="/join">Community Partner</a>
          <a href="/support">Connect</a>
          <a href="/resources">Resources</a></p>
        </div>
<div className="footer-brand">
          <h2>#RaiseThemRight</h2>

          <p className="footer-tagline">Rebuilding the Global Village</p>

          <p>Strengthening the people who raise children.</p>

          <p className="footer-founder">
            A Public Awareness Initiative by Nathlee R. Grant
          </p>
        </div>

        
        <div className="footer-links">
          <h3>Our Belief</h3>
          <p className="footer-quote">
            Every child deserves a strong village.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} #RaiseThemRight. All Rights Reserved.</p>

        <p>Rebuilding the Global Village • One Connection at a Time</p>
      </div>
    </footer>
  );
}
