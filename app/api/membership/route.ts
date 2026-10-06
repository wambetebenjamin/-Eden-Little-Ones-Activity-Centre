import { NextRequest, NextResponse } from "next/server";
import { membershipSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/server/recaptcha";
import { kvStore } from "@/lib/server/kv";
import { initiateMpesaDeposit } from "@/lib/server/mpesa";
import { membershipTiers } from "@/lib/data/membership";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = membershipSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const verification = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
  if (!verification.success) {
    return NextResponse.json({ success: false, needsV2Fallback: verification.needsV2Fallback }, { status: 200 });
  }

  const tier = membershipTiers.find((t) => t.slug === parsed.data.tier);
  const member = { id: `mem_${Date.now()}`, ...parsed.data, createdAt: new Date().toISOString() };
  await kvStore.lpush("eden:memberships", member);

  const billing = await initiateMpesaDeposit({
    phone: parsed.data.phone,
    amountKES: tier?.priceKES ?? 0,
    accountReference: member.id,
    description: `${tier?.name ?? "Membership"} sign-up`,
  });

  return NextResponse.json({ success: true, member, billing });
}
