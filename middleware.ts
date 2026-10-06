import { NextRequest, NextResponse } from "next/server";

// Edge middleware rate limiting for booking and birthday endpoints, per the
// brief. Uses a simple in-memory sliding window keyed by IP; note that on
// Vercel Edge this resets per isolate, so for strict multi-region guarantees
// pair with Vercel KV-based limiting in production.
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 8;
const hits = new Map<string, number[]>();

export const config = {
  matcher: ["/api/booking", "/api/birthday"],
};

export function middleware(req: NextRequest) {
  const ip = req.ip || req.headers.get("x-forwarded-for") || "anonymous";
  const key = `${ip}:${req.nextUrl.pathname}`;
  const now = Date.now();
  const timestamps = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    return NextResponse.json(
      { success: false, message: "Too many requests, please try again shortly." },
      { status: 429 }
    );
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return NextResponse.next();
}
