"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const connectionCategories = [
  "Prayer",
  "Parenting",
  "Marriage & Relationships",
  "Fatherhood",
  "Motherhood",
  "Teen & Youth",
  "Child Behaviour",
  "Education & School",
  "Special Needs",
  "Grief & Loss",
  "Personal Encouragement",
  "Community Resources",
  "Other",
];

const preferredConnectionMethods = [
  "Online",
  "In Person where available",
  "Either",
];

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
      connection_categories: formData
        .getAll("connection_categories")
        .map(String),
      preferred_connection_method: String(
        formData.get("preferred_connection_method") || ""
      ),
    };

    const { error } = await supabase
      .from("support_requests")
      .insert([supportRequest]);

    if (error) {
      console.error("Supabase connection request error:", error);
      setErrorMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/thank-you-support");
  }

  return (
    <main className="support-page">
      <section className="support-hero">
        <p className="eyebrow">#RaiseThemRight</p>

        <h1>Connect</h1>

        <p>
          Every family needs encouragement from time to time. Whether you are
          looking for prayer, parenting guidance, mentorship, or simply someone
          who will listen, you do not have to take the next step alone. Welcome
          to the Global Village.
        </p>
      </section>

      <section className="support-card">
        <h2>How would you like to connect?</h2>

        <div className="safety-note">
          <strong>Safety Note:</strong> If this is an emergency, or if someone
          is in immediate danger, please contact your local emergency services
          or a trusted authority right away. #RaiseThemRight is not an emergency
          response service.
        </div>

        <div className="serve-grid">
          <div className="serve-card">
            <h3>Prayer</h3>
            <p>
              Share a prayer request for yourself, your family, or your
              community.
            </p>
          </div>

          <div className="serve-card">
            <h3>Parenting Guidance</h3>
            <p>
              Connect with someone who understands both the joys and challenges
              of raising children.
            </p>
          </div>

          <div className="serve-card">
            <h3>Mentorship</h3>
            <p>
              Find encouragement for a child, teenager, young adult, or even
              yourself.
            </p>
          </div>

          <div className="serve-card">
            <h3>Community Resources</h3>
            <p>
              Discover trusted churches, organizations, and community services
              that may be able to help.
            </p>
          </div>
        </div>

        <div className="connection-note">
          <h3>Before You Continue</h3>
          <p>
            Every story matters. You do not need to tell us everything today.
            Simply share enough for us to help connect you with a Community
            Partner who may be a good fit for your journey.
          </p>
        </div>

        <form className="movement-form" onSubmit={handleSubmit}>
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
          />

          <input name="country" type="text" placeholder="Country" required />

          <input name="parish_state" type="text" placeholder="Parish / State" />

          <fieldset className="form-fieldset">
            <legend>What would you like to connect about?</legend>

            <div className="form-option-grid">
              {connectionCategories.map((category) => (
                <label className="form-option" key={category}>
                  <input
                    name="connection_categories"
                    type="checkbox"
                    value={category}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="form-fieldset">
            <legend>How would you prefer to connect?</legend>

            <div className="form-option-row">
              {preferredConnectionMethods.map((method) => (
                <label className="form-option" key={method}>
                  <input
                    name="preferred_connection_method"
                    type="radio"
                    value={method}
                    required
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <textarea
            name="request_details"
            placeholder="Tell us a little more (optional). Share only what you are comfortable sharing today."
          />

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button
            type="submit"
            className="button primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Request a Connection"}
          </button>

          <p className="privacy-note">
            <strong>Your privacy matters.</strong> Personal contact information
            is never shared publicly. Information you provide is used only to
            help facilitate a safe and appropriate connection with a Community
            Partner.
          </p>
        </form>
      </section>
    </main>
  );
}
