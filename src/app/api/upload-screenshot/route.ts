import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * /api/upload-screenshot — internal helper used ONLY during local
 * documentation work to ferry html2canvas captures from the SmilePass admin
 * tab (https://app.smilepass.com.au) into public/images/wiki/.
 *
 * Hardened so it's a no-op outside local development:
 *   - Refuses when NODE_ENV !== "development"
 *   - Refuses when ALLOW_SCREENSHOT_UPLOAD !== "true" in .env.local
 *   - Whitelists filenames to a-z, 0-9, dashes; locks the extension to .png
 *   - Caps payload size
 *
 * Adds permissive CORS so the JS tool can POST cross-origin from the
 * SmilePass admin page during capture sessions.
 */

const ALLOWED_FILENAME = /^[a-z0-9][a-z0-9-]{1,80}\.png$/;
const ALLOWED_SUBDIRS = new Set(["wiki", "strategy"]);
const MAX_BASE64_LEN = 6 * 1024 * 1024; // ~6MB encoded ≈ 4.5MB binary

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "disabled outside dev" }, { status: 403, headers: corsHeaders });
  }
  if (process.env.ALLOW_SCREENSHOT_UPLOAD !== "true") {
    return NextResponse.json(
      { error: "set ALLOW_SCREENSHOT_UPLOAD=true in .env.local to enable" },
      { status: 403, headers: corsHeaders },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400, headers: corsHeaders });
  }

  const { filename, dataUrl, subdir } = (body ?? {}) as {
    filename?: string;
    dataUrl?: string;
    subdir?: string;
  };

  if (typeof filename !== "string" || !ALLOWED_FILENAME.test(filename)) {
    return NextResponse.json(
      { error: "filename must be slug.png (a-z, 0-9, dashes)" },
      { status: 400, headers: corsHeaders },
    );
  }
  const targetSubdir = typeof subdir === "string" && ALLOWED_SUBDIRS.has(subdir) ? subdir : "wiki";
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/png;base64,")) {
    return NextResponse.json(
      { error: "dataUrl must be a base64-encoded PNG data URL" },
      { status: 400, headers: corsHeaders },
    );
  }
  if (dataUrl.length > MAX_BASE64_LEN) {
    return NextResponse.json(
      { error: `payload too large (>${MAX_BASE64_LEN} chars)` },
      { status: 413, headers: corsHeaders },
    );
  }

  const base64 = dataUrl.slice("data:image/png;base64,".length);
  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64, "base64");
  } catch {
    return NextResponse.json({ error: "invalid base64" }, { status: 400, headers: corsHeaders });
  }

  const targetDir = path.join(process.cwd(), "public", "images", targetSubdir);
  const targetPath = path.join(targetDir, filename);

  try {
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetPath, buffer);
  } catch (err) {
    console.error("[/api/upload-screenshot] write error", err);
    return NextResponse.json({ error: "write failed" }, { status: 500, headers: corsHeaders });
  }

  return NextResponse.json(
    { success: true, savedTo: `/images/${targetSubdir}/${filename}`, bytes: buffer.length },
    { status: 200, headers: corsHeaders },
  );
}
