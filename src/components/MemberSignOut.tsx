"use client";

import { useState } from "react";

export default function MemberSignOut() {
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/members/logout", { method: "POST" });
    } finally {
      window.location.href = "/member-login";
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={signingOut}
      style={{
        border: "1px solid rgba(11, 29, 58, 0.2)",
        background: "#fffdf7",
        color: "#0b1d3a",
        borderRadius: "999px",
        padding: "0.65rem 1rem",
        fontWeight: 700,
        cursor: signingOut ? "default" : "pointer",
      }}
    >
      {signingOut ? "Signing out..." : "Sign Out"}
    </button>
  );
}
