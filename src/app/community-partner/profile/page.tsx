import { requireMember } from "../../../lib/memberAuth";
import CommunityPartnerProfileClient from "./CommunityPartnerProfileClient";

export default async function CommunityPartnerProfilePage() {
  await requireMember("community_partner");
  return <CommunityPartnerProfileClient />;
}
