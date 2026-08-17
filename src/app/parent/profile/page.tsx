import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import ParentProfileClient from "./ParentProfileClient";

export default async function ParentProfilePage() {
  await requireMember("parent");
  return (
    <>
      <div style={{ maxWidth: "900px", margin: "1rem auto -0.5rem", padding: "0 1rem", display: "flex", justifyContent: "flex-end" }}>
        <MemberSignOut />
      </div>
      <ParentProfileClient />
    </>
  );
}
