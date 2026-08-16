"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const response = await fetch("/api/members/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: String(formData.get("firstName") || ""),
        lastName: String(formData.get("lastName") || ""),
        email: String(formData.get("email") || ""),
        password,
        accountType: String(formData.get("accountType") || ""),
        country: String(formData.get("country") || ""),
        parishState: String(formData.get("parishState") || ""),
        adultConfirmed: formData.get("adultConfirmed") === "yes",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrorMessage(result.error || "Unable to create your account.");
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(result.message || "Your account has been created.");
    form.reset();
    setShowPassword(false);
    setIsSubmitting(false);
  }

  return (
    <main className="pledge-page">
      <section className="pledge-hero">
        <p className="eyebrow">#RaiseThemRight Community</p>
        <h1>Create Your Adult Account</h1>
        <p>
          Parents seek support. Community Partners offer support. The platform helps adults find each other safely.
        </p>
      </section>

      <section className="pledge-card">
        <div style={{ marginBottom: "1.5rem" }}>
          <h2>Join the Community</h2>
          <p>
            #RaiseThemRight is an adult community supporting parents and families. Children do not create accounts and are not matched with Community Partners.
          </p>
        </div>

        <form className="pledge-form" onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", width: "100%" }}>
            <input name="firstName" type="text" placeholder="First Name" autoComplete="given-name" required />
            <input name="lastName" type="text" placeholder="Last Name" autoComplete="family-name" required />
          </div>

          <input name="email" type="email" placeholder="Email Address" autoComplete="email" required />

          <fieldset style={{ width: "100%", border: "1px solid #d9d9d9", borderRadius: "12px", padding: "1rem" }}>
            <legend style={{ padding: "0 0.4rem", fontWeight: 700 }}>I am joining as</legend>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.8rem", cursor: "pointer" }}>
              <input name="accountType" type="radio" value="parent" required style={{ width: "auto", marginTop: "0.25rem" }} />
              <span><strong>Parent</strong><br />I am seeking support related to parenting or strengthening my family.</span>
            </label>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
              <input name="accountType" type="radio" value="community_partner" required style={{ width: "auto", marginTop: "0.25rem" }} />
              <span><strong>Community Partner</strong><br />I want to offer appropriate support to parents and families.</span>
            </label>
          </fieldset>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", width: "100%" }}>
            <input name="country" type="text" placeholder="Country" autoComplete="country-name" />
            <input name="parishState" type="text" placeholder="Parish / State" autoComplete="address-level1" />
          </div>

          <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="new-password" required />
          <input name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirm Password" autoComplete="new-password" required />

          <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", width: "auto" }}>
              <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} style={{ width: "auto", margin: 0 }} />
              <span>{showPassword ? "Hide passwords" : "Show passwords"}</span>
            </label>
          </div>

          <div style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "#f7f4eb" }}>
            <strong>Adults only</strong>
            <p style={{ margin: "0.4rem 0 0" }}>
              This account must belong to an adult. Do not create an account for a child or enter a child's identifying information here.
            </p>
          </div>

          <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", width: "100%", cursor: "pointer" }}>
            <input name="adultConfirmed" type="checkbox" value="yes" required style={{ width: "auto", marginTop: "0.25rem" }} />
            <span>I confirm that I am an adult and that this account is for me, not for a child.</span>
          </label>

          {errorMessage && <p className="form-error">{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}

          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
}
