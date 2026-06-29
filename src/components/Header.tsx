import Image from "next/image";

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="#RaiseThemRight home">
        <Image
          src="/images/raisethemright-logo-primary.png"
          alt="#RaiseThemRight - Strengthening the people who raise children."
          width={900}
          height={360}
          priority
        />
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">Our Foundation</a>
        <a href="/pledge">The Pledge</a>
        <a href="/join">Community Partners</a>
        <a href="/support">Connect</a>
        <a href="/resources">Resources</a>
      </nav>
    </header>
  );
}
