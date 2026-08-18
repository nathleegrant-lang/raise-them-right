import Link from "next/link";
import MemberSignOut from "../../../components/MemberSignOut";
import { requireMember } from "../../../lib/memberAuth";
import ParentProfileClient from "./ParentProfileClient";
export default async function ParentProfilePage(){await requireMember("parent");return <><div style={{maxWidth:"900px",margin:"1rem auto -0.5rem",padding:"0 1rem",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem",flexWrap:"wrap"}}><Link href="/parent/onboarding" style={{fontWeight:700,color:"#0b1d3a"}}>← Parent Home</Link><MemberSignOut/></div><ParentProfileClient/></>}
