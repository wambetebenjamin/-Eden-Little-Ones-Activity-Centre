import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptcha } from "@/lib/server/recaptcha";

// Standalone reCAPTCHA verification endpoint. All other form routes also call
// verifyRecaptcha() directly server-side; this route exists so the client (or
// any external integration) can pre-check a token independently.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { token, variant } = body as { token?: string; variant?: "v3" | "v2" };
  const result = await verifyRecaptcha(token, variant ?? "v3");
  return NextResponse.json(result);
}
