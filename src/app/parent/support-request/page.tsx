import { requireMember } from "../../../lib/memberAuth";
import SupportRequestClient from "./SupportRequestClient";
export default async function ParentSupportRequestPage(){await requireMember("parent");return <SupportRequestClient/>;}
