import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/server/recaptcha";
import { kvStore } from "@/lib/server/kv";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const verification = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
  if (!verification.success) {
    return NextResponse.json({ success: false, needsV2Fallback: verification.needsV2Fallback }, { status: 200 });
  }

  const subscribers = (await kvStore.get<string[]>("eden:newsletter-subscribers")) ?? [];
  if (!subscribers.includes(parsed.data.email)) {
    subscribers.push(parsed.data.email);
    await kvStore.set("eden:newsletter-subscribers", subscribers);
  }
  await kvStore.lpush("eden:newsletter-signups", { ...parsed.data, createdAt: new Date().toISOString() });

  return NextResponse.json({ success: true });
}
