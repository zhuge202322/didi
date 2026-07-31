import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, removeAdminSession } from "../../../../lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  removeAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", expires: new Date(0) });
  return response;
}
