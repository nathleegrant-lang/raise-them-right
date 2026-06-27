"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function PledgePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);

    const pledge = {
      first_name: String(formData.get("first_name") || ""),
      last_name: String(formData.get("last_name") || ""),
      email: String(formData.get("email") || ""),
      country: String(formData.get("country") || ""),
      parish_state: String(formData.get("parish_state") || ""),
    };

    const { error } = await supabase.from("pledges").insert([pledge]);

   if (error) {
  console.error("Supabase pledge error:", error);
  setErrorMessage(error.message);
  setIsSubmitting(false);
  return;
}

    router.push("/thank-you-pledge");
  }

  return (
    <main className="pledge-page">
      <nav className="pledge-nav">
        <a href="/">Home</a>
        <a href="/#community">Community</a>
        <a href="/resources">Resources</a>
        <a href="/join">Become a Community Partner</a>
      </nav>

      <section className="pledge-hero">
        <p className="eyebrow">#RaiseThemRight</p>
        <h1>The Pledge</h1>
        <p>
          Every child deserves adults who lead with love, character,
          responsibility, faith, and example.
        </p>
      </section>

      <section className="pledge-card">
        <h2>I commit to:</h2>

        <ul>
          <li>Supporting parents.</li>
          <li>Encouraging children.</li>
          <li>Being a positive example.</li>
          <li>Strengthening my community.</li>
          <li>Helping raise the next generation well.</li>
          <li>
            Playing my part in building strong homes, strong children, and a
            strong nation.
          </li>
        </ul>

        <form className="pledge-form" onSubmit={handleSubmit}>
          <input name="first_name" type="text" placeholder="First Name" required />
          <input name="last_name" type="text" placeholder="Last Name" required />
          <input name="email" type="email" placeholder="Email Address" required />
          <input name="country" type="text" placeholder="Country" required />
          <input name="parish_state" type="text" placeholder="Parish / State (Optional)" />

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "I Take The Pledge"}
          </button>
        </form>
      </section>
    </main>
  );
}
