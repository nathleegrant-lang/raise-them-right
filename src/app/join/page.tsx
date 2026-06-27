"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function JoinPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const roles = [
    "Prayer Partner",
    "Mentor",
    "Community Champion",
    "Parent Advocate",
    "Faith Partner",
    "Professional Support",
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const volunteer = {
      first_name: String(formData.get("first_name") || ""),
      last_name: String(formData.get("last_name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      country: String(formData.get("country") || ""),
      parish_state: String(formData.get("parish_state") || ""),
      experience: String(formData.get("experience") || ""),
    };

    const { error } = await supabase.from("volunteers").insert([volunteer]);

    if (error) {
      console.error("Supabase volunteer error:", error);
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/thank-you-join");
  }

  return (
    <main className="join-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/pledge">Take the Pledge</a>
        <a href="/resources">Resources</a>
        <a href="/support">Connect with a Community Partner</a>
      </nav>

      <section className="join-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>Become a Community Partner</h1>
        <p>
          Strong homes are built one relationship at a time. Join us as we
          support parents, strengthen communities, and invest in the next
          generation.
        </p>
      </section>

      <section className="join-movement-card">
        <h2>How would you like to serve?</h2>

        <div className="serve-grid">
          {roles.map((role) => (
            <div className="serve-card" key={role}>
              <h3>{role}</h3>
              <p>
                Help strengthen homes, encourage families, and support children
                through your time, experience, prayer, or professional skills.
              </p>
            </div>
          ))}
        </div>

        <form className="movement-form" onSubmit={handleSubmit}>
          <input name="first_name" type="text" placeholder="First Name" required />
          <input name="last_name" type="text" placeholder="Last Name" required />
          <input name="email" type="email" placeholder="Email Address" required />
          <input name="phone" type="tel" placeholder="Phone Number" />
          <input name="country" type="text" placeholder="Country" required />
          <input name="parish_state" type="text" placeholder="Parish / State" />

          <textarea
            name="experience"
            placeholder="Tell us how you would like to serve, or share your experience/skills."
          />

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Become a Community Partner"}
          </button>
        </form>
      </section>
    </main>
  );
}
