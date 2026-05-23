import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const CACHE_TAG = "github:user:rober8b";

/**
 * Busts the GitHub Activity ISR cache.
 *
 * Usage (browser or curl):
 *   GET  /api/revalidate-github?secret=<REVALIDATE_SECRET>
 *   POST /api/revalidate-github?secret=<REVALIDATE_SECRET>
 *
 * If REVALIDATE_SECRET is not set on the server, the route refuses requests
 * (fail-closed). Set it in Vercel project env vars + .env.local.
 */
async function handle(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET not configured on server" },
      { status: 503 },
    );
  }
  const provided = req.nextUrl.searchParams.get("secret");
  if (provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Next 16: revalidateTag requires a profile arg. `{ expire: 0 }` triggers
  // immediate revalidation (next request fetches fresh).
  revalidateTag(CACHE_TAG, { expire: 0 });

  return NextResponse.json({
    revalidated: true,
    tag: CACHE_TAG,
    now: new Date().toISOString(),
  });
}

export async function GET(req: NextRequest) {
  return handle(req);
}

export async function POST(req: NextRequest) {
  return handle(req);
}
