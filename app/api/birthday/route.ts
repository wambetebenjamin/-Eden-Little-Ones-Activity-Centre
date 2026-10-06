import { NextRequest, NextResponse } from "next/server";
import { birthdaySchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/server/recaptcha";
import { kvStore } from "@/lib/server/kv";
import { sendWhatsAppNotification } from "@/lib/server/whatsapp";
import { birthdayPackages } from "@/lib/data/packages";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = birthdaySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const verification = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
  if (!verification.success) {
    return NextResponse.json({ success: false, needsV2Fallback: verification.needsV2Fallback }, { status: 200 });
  }

  const pkg = birthdayPackages.find((p) => p.slug === parsed.data.selectedPackage);
  const enquiry = { id: `bday_${Date.now()}`, ...parsed.data, createdAt: new Date().toISOString() };
  await kvStore.lpush("eden:birthday-enquiries", enquiry);

  await sendWhatsAppNotification(
    `New birthday party enquiry:\nPackage: ${pkg?.name ?? parsed.data.selectedPackage}\nChild: ${parsed.data.childName} turning ${parsed.data.childAge}\nDate: ${parsed.data.preferredDate}\nGuests: ${parsed.data.numberOfGuests}\nParent: ${parsed.data.parentName} (${parsed.data.phone}, ${parsed.data.email})\nNotes: ${parsed.data.notes || "-"}`
  );

  return NextResponse.json({ success: true, enquiry });
}
