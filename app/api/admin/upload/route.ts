import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminSession } from "../../../../lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes: Record<string, string> = { "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp" };

export async function POST(request: NextRequest) {
  if (!isAdminSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    const extension = allowedTypes[file.type];
    if (!extension) return NextResponse.json({ error: "Only PNG, JPEG and WebP images are supported." }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "The image must be smaller than 10MB." }, { status: 400 });
    const date = new Date();
    const folderParts = [String(date.getUTCFullYear()), String(date.getUTCMonth() + 1).padStart(2, "0")];
    const folder = path.join(process.cwd(), "public", "uploads", ...folderParts);
    await mkdir(folder, { recursive: true });
    const filename = `${randomUUID()}${extension}`;
    await writeFile(path.join(folder, filename), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ path: `/uploads/${folderParts.join("/")}/${filename}` });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 500 });
  }
}
