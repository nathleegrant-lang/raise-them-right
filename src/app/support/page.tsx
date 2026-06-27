"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SupportPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const supportRequest = {
      first_name: String(formData.get("first_name") || ""),
      email: String(formData.get("email") || ""),
      country: String(formData.get("country") || ""),
      parish_state: String(formData.get("parish_state") || ""),
      request_details: String(formData.get("request_details") || ""),
    };

    const { error } = await supabase
      .from("support_requests")
      .insert([supportRequest]);

    if (error) {
      console.error("Supabase support request error:", error);
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/thank-you-support");
  }

  return (
    <main className="support-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/pledge">Take the Pledge</a>
        <a href="/join">Become a Community Partner</a>
        <a href="/resources">Resources</a>
      </nav>

      <section className="support-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>Connect with a Community Partner</h1>
        <p>
          No parent should have to feel alone. Whether you need prayer,
          parenting guidance, mentorship, or referral support, this is a place
          to begin.
        </p>
      </section>

      <section className="support-card">
        <h2>How can we connect you?</h2>
        <div className="safety-note">
  <strong>Safety Note:</strong> If this is an emergency, or if someone is in immediate danger, please contact your local emergency services or a trusted authority right away. #RaiseThemRight is not an emergency response service.
</div>

        <div className="serve-grid">
          <div className="serve-card">
            <h3>Prayer Request</h3>
            <p>
              Share a prayer need for your child, family, home, or community.
            </p>
          </div>

          <div className="serve-card">
            <h3>Parenting Guidance</h3>
            <p>
              Ask for support with behaviour, communication, school issues, or
              family challenges.
            </p>
          </div>

          <div className="serve-card">
            <h3>Mentorship</h3>
            <p>
              Request mentorship support for a child, teen, parent, or young
              adult.
            </p>
          </div>

          <div className="serve-card">
            <h3>Referral Support</h3>
            <p>
              Connect with trusted counselling, church, or community support
              services where possible.
            </p>
          </div>
        </div>

        <form className="movement-form" onSubmit={handleSubmit}>
          <input name="first_name" type="text" placeholder="First Name" required />
          <input name="email" type="email" placeholder="Email Address" required />
          <input name="country" type="text" placeholder="Country" required />
          <input name="parish_state" type="text" placeholder="Parish / State" />

          <textarea
            name="request_details"
            placeholder="Briefly share the connection you are seeking."
            required
          />

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request a Connection"}
          </button>
        </form>
      </section>
    </main>
  );
}
