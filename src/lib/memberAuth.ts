import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabaseAdmin";

export const MEMBER_ACCESS_COOKIE = "raisethemright_member_access";

export type MemberAccount = {
  user_id: string;
  account_type: "parent" | "community_partner";
  account_status: "onboarding" | "active" | "suspended" | "closed";
  first_name: string;
  last_name: string;
  display_name: string | null;
  country: string | null;
  parish_state: string | null;
  adult_confirmed: boolean;
};

export async function getMemberFromToken(token: string | undefined | null) {
  if (!token) return null;

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
  if (userError || !userData.user) return null;

  const { data: account, error: accountError } = await supabaseAdmin
    .from("member_accounts")
    .select("user_id, account_type, account_status, first_name, last_name, display_name, country, parish_state, adult_confirmed")
    .eq("user_id", userData.user.id)
    .maybeSingle<MemberAccount>();

  if (accountError || !account || !account.adult_confirmed) return null;
  if (account.account_status === "suspended" || account.account_status === "closed") return null;

  return { user: userData.user, account };
}

export async function requireMember(expectedType?: "parent" | "community_partner") {
  const token = cookies().get(MEMBER_ACCESS_COOKIE)?.value;
  const member = await getMemberFromToken(token);

  if (!member) redirect("/member-login");

  if (expectedType && member.account.account_type !== expectedType) {
    redirect(member.account.account_type === "parent" ? "/parent/onboarding" : "/community-partner/onboarding");
  }

  return member;
}
