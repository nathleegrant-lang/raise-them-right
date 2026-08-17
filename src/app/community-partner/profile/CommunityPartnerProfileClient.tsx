"use client";

import { FormEvent, useEffect, useState } from "react";
import MemberSignOut from "../../../components/MemberSignOut";

const groups = {
  supportAreas: { title: "What kinds of support can you offer parents and families?", options: [["parenting_guidance","Parenting guidance"],["education_learning","Education & learning support"],["family_routines","Family routines & organisation"],["faith_family","Faith & family encouragement"],["community_resources","Community resources"],["career_life_skills","Career & life skills"],["emotional_encouragement","Adult encouragement & listening"]] },
  supportFormats: { title: "How can you offer support?", options: [["one_to_one_adult_guidance","One-to-one adult guidance"],["parent_groups","Parent group support"],["workshops","Workshops / learning sessions"],["information_resources","Information & resources"],["community_referral","Community referrals"]] },
  serviceScope: { title: "Where can you generally offer support?", options: [["online","Online"],["local_community","Local community"],["parish_state","Within my parish / state"],["national","Nationally"]] },
  availability: { title: "When are you generally available?", options: [["weekday_mornings","Weekday mornings"],["weekday_afternoons","Weekday afternoons"],["weekday_evenings","Weekday evenings"],["weekends","Weekends"],["flexible","Flexible"]] },
} as const;
type GroupName = keyof typeof groups;
type State = Record<GroupName, string[]>;
const empty: State = { supportAreas: [], supportFormats: [], serviceScope: [], availability: [] };

export default function CommunityPartnerProfileClient() {
  const [selections, setSelections] = useState<State>(empty);
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [saving, setSaving] = useState(false);
  useEffect(() => { fetch("/api/community-partner/profile").then(r => r.json()).then(result => { if (!result.profile) return; setSelections({ supportAreas: result.profile.support_areas || [], supportFormats: result.profile.support_formats || [], serviceScope: result.profile.service_scope || [], availability: result.profile.availability || [] }); }).catch(() => undefined); }, []);
  function toggle(group: GroupName, value: string) { setSelections(current => ({ ...current, [group]: current[group].includes(value) ? current[group].filter(item => item !== value) : [...current[group], value] })); }
  async function save(event: FormEvent) { event.preventDefault(); setMessage(""); setError(""); setSaving(true); const response = await fetch("/api/community-partner/profile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(selections) }); const result = await response.json(); setSaving(false); if (!response.ok) { setError(result.error || "Unable to save your profile."); return; } setMessage(result.message || "Your Community Partner profile has been saved."); }

  return <main className="pledge-page">
    <section className="pledge-hero" style={{ textAlign: "center" }}><p className="eyebrow">#RaiseThemRight Community</p><h1>Community Partner Profile</h1><p>Tell us how you can appropriately support parents and families.</p></section>
    <section className="pledge-card">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}><MemberSignOut /></div>
      <div role="note" style={{ padding: "1.15rem 1.25rem", borderRadius: "12px", background: "#fff8e7", border: "1px solid #f2b632", borderLeft: "5px solid #f2b632", marginBottom: "1.5rem", color: "#13213a" }}><strong style={{ display: "block", fontSize: "1.05rem" }}>A quick safety reminder</strong><p style={{ margin: "0.4rem 0 0", lineHeight: 1.5 }}>Community Partners support parents and families. Please do not request or enter a child's name, photograph, school, exact age, address, telephone number, or other identifying information. #RaiseThemRight does not independently match Community Partners with children.</p></div>
      <form className="pledge-form" onSubmit={save}>
        {(Object.entries(groups) as [GroupName,(typeof groups)[GroupName]][]).map(([name, group]) => <fieldset key={name} style={{ width: "100%", border: "1px solid #d9d9d9", borderRadius: "12px", padding: "1rem" }}><legend style={{ padding: "0 0.4rem", fontWeight: 700 }}>{group.title}</legend><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "0.75rem 1.25rem" }}>{group.options.map(([value,label]) => <label key={value} style={{ display: "flex", gap: "0.55rem", cursor: "pointer" }}><input type="checkbox" checked={selections[name].includes(value)} onChange={() => toggle(name,value)} style={{ width: "auto" }} /><span>{label}</span></label>)}</div></fieldset>)}
        {error && <p className="form-error">{error}</p>}{message && <div role="status" style={{ width: "100%", padding: "1rem", borderRadius: "12px", background: "#eef5ff", border: "1px solid #9fc3ef", color: "#0b3a70" }}><strong>Profile Saved ✓</strong><p style={{ margin: "0.35rem 0 0" }}>{message}</p></div>}
        <button type="submit" className="button primary" disabled={saving}>{saving ? "Saving..." : "Save Community Partner Profile"}</button>
      </form>
    </section>
  </main>;
}
