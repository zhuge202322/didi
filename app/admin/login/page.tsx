import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ADMIN_COOKIE, isAdminSession } from "../../../lib/admin-auth";
import { AdminLoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  if (isAdminSession(cookies().get(ADMIN_COOKIE)?.value)) redirect("/admin");
  return <main className="admin-login-page"><section className="admin-login-brand"><div><Image src="/new-site/logo-mark.png" alt="YnJoy Energy" width={180} height={68} /><h1>Website content management</h1><p>Manage the catalog, product details, contact channels, brand information and page imagery from one place.</p></div></section><section className="admin-login-side"><AdminLoginForm /></section></main>;
}
