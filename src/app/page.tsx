"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const beliefs = [
  "Every child deserves a strong village.",
  "Strong families create strong communities.",
  "No family should walk alone.",
  "Every person has something valuable to give.",
  "Technology should strengthen human connection.",
];

const heroSlides = [
  {
    image: "/images/hero-slider/hero-4-school-walk.jpg",
    className: "slide-schoolr",
    eyebrow: "#RaiseThemRight",
    title: "Every Child Deserves a Village",
    description:
      "Every journey begins with someone who cares enough to walk alongside a child. Strong communities are built one relationship at a time.",
    primaryLabel: "The Pledge",
    primaryHref: "/pledge",
    secondaryLabel: "Our Foundation",
    secondaryHref: "/about",
  },
  {
    image: "/images/hero-slider/hero-1-main-village.jpg",
    className: "slide-village",
    eyebrow: "#RaiseThemRight",
    title: "Rebuilding the Global Village",
    description:
      "Strengthening the people who raise children through faith, family, community, and meaningful connections.",
    primaryLabel: "Community Partners",
    primaryHref: "/join",
    secondaryLabel: "Learn More",
    secondaryHref: "/about",
  },
  {
    image: "/images/hero-slider/hero-2-community-mentor.jpg",
    className: "slide-mentor",
    eyebrow: "It still takes a village",
    title: "Great Communities Invest in Their Children",
    description:
      "Parents, teachers, coaches, mentors, neighbours, and faith communities all help shape the next generation.",
    primaryLabel: "Community Partners",
    primaryHref: "/join",
    secondaryLabel: "Connect",
    secondaryHref: "/support",
  },
  {
    image: "/images/hero-slider/hero-3-family-prayer.jpg",
    className: "slide-family",
    eyebrow: "Faith. Family. Community.",
    title: "Strong Homes Build Strong Nations",
    description:
      "Love, faith, prayer, and character are first nurtured at home and strengthened by the Global Village.",
    primaryLabel: "Connect",
    primaryHref: "/support",
    secondaryLabel: "Resources",
    secondaryHref: "/resources",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <main>
      <section id="top" className="hero-section hero-slider">
        <div className="hero-image-wrap">
          {heroSlides.map((slide, index) => (
            <Image
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className={`hero-image hero-slide-image ${slide.className} ${
                index === activeSlide ? "active" : ""
              }`}
            />
          ))}

          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow">{currentSlide.eyebrow}</p>

            <h1>{currentSlide.title}</h1>

            <p>{currentSlide.description}</p>

            <div className="hero-actions">
              <a href={currentSlide.primaryHref} className="button primary">
                {currentSlide.primaryLabel}
              </a>

              <a href={currentSlide.secondaryHref} className="button secondary">
                {currentSlide.secondaryLabel}
              </a>
            </div>
          </div>

          <div className="hero-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={index === activeSlide ? "active" : ""}
                onClick={() => setActiveSlide(index)}
              />
            ))}
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
            <a href="/pledge" className="button primary">
              Take the Pledge
            </a>
          </div>

          <div className="action-card">
            <h3>Community Partners</h3>
            <p>
              Share your encouragement, prayer, mentorship, experience, or
              professional expertise with families seeking connection.
            </p>
            <a href="/join" className="button primary">
              Community Partners
            </a>
          </div>

          <div className="action-card">
            <h3>Connect</h3>
            <p>
              No family should walk alone. Connect with someone ready to listen,
              encourage, and walk alongside you.
            </p>
            <a href="/support" className="button primary">
              Connect
            </a>
          </div>
        </div>
      </section>

      <section className="village-works-section">
        <div className="village-works-inner">
          <p className="eyebrow">How the Village Works</p>
          <h2>Every connection begins with a thoughtful next step.</h2>

          <div className="village-steps-grid">
            <div className="village-step-card">
              <h3>Choose Your Place</h3>
              <p>
                Take the pledge, become a Community Partner, or request a
                connection.
              </p>
            </div>

            <div className="village-step-card">
              <h3>Build Safe Connections</h3>
              <p>
                The platform helps introduce families and Community Partners
                through a thoughtful and privacy-conscious process.
              </p>
            </div>

            <div className="village-step-card">
              <h3>Grow Together</h3>
              <p>
                Encourage one another through prayer, mentorship, parenting
                support, and community.
              </p>
            </div>
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
            <a href="/join" className="button primary">
              Community Partners
            </a>
            <a href="/support" className="button secondary">
              Connect
            </a>
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
