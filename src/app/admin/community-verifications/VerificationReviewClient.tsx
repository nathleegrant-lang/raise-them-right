"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerificationReviewClient({ userId }: { userId: string }) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function decide(decision: "verified" | "declined") {
    setSaving(true); setError("");
    const response = await fetch(`/api/admin/community-verifications/${userId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ decision, note }) });
    const result = await response.json(); setSaving(false);
    if (!response.ok) { setError(result.error || "Unable to save verification decision."); return; }
    router.refresh();
  }

  return <div style={{marginTop:"1rem"}}>
    <label style={{display:"block",fontWeight:700,marginBottom:".4rem"}}>Admin note <span style={{fontWeight:400,color:"#667085"}}>(optional)</span></label>
    <textarea value={note} onChange={e=>setNote(e.target.value)} maxLength={500} rows={3} placeholder="Record a brief adult-focused verification note." style={{width:"100%",padding:".8rem",border:"1px solid #cfd4dc",borderRadius:"10px",resize:"vertical"}} />
    {error && <p style={{color:"#b42318",fontWeight:700}}>{error}</p>}
    <div style={{display:"flex",gap:".75rem",flexWrap:"wrap",marginTop:".75rem"}}>
      <button type="button" className="button primary" disabled={saving} onClick={()=>decide("verified")}>{saving?"Saving...":"Approve Verification"}</button>
      <button type="button" className="button secondary" disabled={saving} onClick={()=>decide("declined")}>Decline</button>
    </div>
  </div>;
}
