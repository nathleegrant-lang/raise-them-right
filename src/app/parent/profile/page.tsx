import Link from "next/link";
import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import ParentProfileClient from "./ParentProfileClient";
export default async function ParentProfilePage(){await requireMember("parent");return <ParentProfileClient navigation={<><Link href="/parent/onboarding" style={{fontWeight:700,color:"#0b1d3a"}}>← Parent Home</Link><MemberSignOut/></>}/>}
