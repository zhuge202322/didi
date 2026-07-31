import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminSession } from "../../../../lib/admin-auth";
import { getAdminBootstrap } from "../../../../lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(getAdminBootstrap());
}
