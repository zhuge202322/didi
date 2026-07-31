import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminSession } from "../../../../../lib/admin-auth";
import { createResource, deleteResource, getAdminBootstrap, saveSettings, updateResource } from "../../../../../lib/content-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: NextRequest) {
  return isAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : "Unable to save content.";
  const friendly = message.includes("FOREIGN KEY") ? "This category still contains products. Move or delete those products first." : message.includes("UNIQUE") ? "This value is already in use. Check the ID, slug, or image order." : message;
  return NextResponse.json({ error: friendly }, { status: 400 });
}

export async function POST(request: NextRequest, { params }: { params: { resource: string } }) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const input = (await request.json()) as Record<string, unknown>;
    if (params.resource === "settings") saveSettings(input); else createResource(params.resource, input);
    return NextResponse.json({ ok: true, data: getAdminBootstrap() });
  } catch (error) { return errorResponse(error); }
}

export async function PUT(request: NextRequest, { params }: { params: { resource: string } }) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const input = (await request.json()) as Record<string, unknown>;
    if (params.resource === "settings") saveSettings(input); else updateResource(params.resource, input);
    return NextResponse.json({ ok: true, data: getAdminBootstrap() });
  } catch (error) { return errorResponse(error); }
}

export async function DELETE(request: NextRequest, { params }: { params: { resource: string } }) {
  if (!authorized(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const identifier = request.nextUrl.searchParams.get("id");
    if (!identifier) return NextResponse.json({ error: "Missing ID." }, { status: 400 });
    deleteResource(params.resource, params.resource === "categories" ? identifier : Number(identifier));
    return NextResponse.json({ ok: true, data: getAdminBootstrap() });
  } catch (error) { return errorResponse(error); }
}
