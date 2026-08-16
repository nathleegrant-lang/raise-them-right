"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function MemberLoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/members/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(formData.get("email") || ""),
        password: String(formData.get("password") || ""),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      setErrorMessage(result.error || "Unable to sign in.");
      setIsSubmitting(false);
      return;
    }

    router.push(result.destination || "/");
    router.refresh();
  }

  return (
    <main className="pledge-page">
      <section className="pledge-hero">
        <p className="eyebrow">#RaiseThemRight Community</p>
        <h1>Community Sign In</h1>
        <p>For registered Parents and Community Partners.</p>
      </section>

      <section className="pledge-card">
        <h2>Welcome Back</h2>
        <p style={{ marginBottom: "1.25rem" }}>Sign in to continue your #RaiseThemRight community journey.</p>

        <form className="pledge-form" onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email Address" autoComplete="email" required />
          <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" autoComplete="current-password" required />

          <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
            <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", width: "auto" }}>
              <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} style={{ width: "auto", margin: 0 }} />
              <span>{showPassword ? "Hide password" : "Show password"}</span>
            </label>
          </div>

          {errorMessage && <p className="form-error">{errorMessage}</p>}

          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={{ marginTop: "1.25rem" }}>New to the community? <a href="/register">Create an adult account</a>.</p>
      </section>
    </main>
  );
}
