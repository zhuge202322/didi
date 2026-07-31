import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminSession, verifyAdminPassword } from "../../../../lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { password?: string };
    if (!verifyAdminPassword(body.password || "")) return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    const session = createAdminSession();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, session.token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires: session.expiresAt });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to sign in." }, { status: 500 });
  }
}
