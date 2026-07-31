"use client";

import { useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      window.location.href = "/admin";
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to sign in."); setLoading(false); }
  }
  return <form className="admin-login-form" onSubmit={submit}><span>ADMIN PORTAL</span><h2>Sign in</h2><p>Use the administrator password configured on this server.</p>{error ? <div className="admin-alert">{error}</div> : null}<label className="admin-field">Password<div style={{ position: "relative" }}><LockKeyhole size={17} style={{ position: "absolute", left: 12, top: 13, color: "#728078" }} /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required autoFocus style={{ paddingLeft: 39 }} /></div></label><button className="admin-primary" type="submit" disabled={loading}>{loading ? "Signing in..." : <>Sign in <LogIn size={17} /></>}</button></form>;
}
