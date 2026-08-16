import { ReactNode } from "react";
import { requireAdmin } from "../../lib/adminAuth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  return children;
}
