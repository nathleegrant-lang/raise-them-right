import { requireMember } from "../../../lib/memberAuth";
import ParentProfileClient from "./ParentProfileClient";

export default async function ParentProfilePage() {
  await requireMember("parent");
  return <ParentProfileClient />;
}
