import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminSession } from "../../lib/admin-auth";
import { getAdminBootstrap } from "../../lib/content-store";
import { AdminDashboard } from "./admin-dashboard";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  if (!isAdminSession(cookies().get(ADMIN_COOKIE)?.value)) redirect("/admin/login");
  return <AdminDashboard initialData={getAdminBootstrap()} />;
}
