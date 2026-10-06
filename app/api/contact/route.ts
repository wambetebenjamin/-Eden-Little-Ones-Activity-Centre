import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/server/recaptcha";
import { kvStore } from "@/lib/server/kv";
import { sendMail } from "@/lib/server/mailer";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const verification = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
  if (!verification.success) {
    return NextResponse.json({ success: false, needsV2Fallback: verification.needsV2Fallback }, { status: 200 });
  }

  const enquiry = { id: `contact_${Date.now()}`, ...parsed.data, createdAt: new Date().toISOString() };
  await kvStore.lpush("eden:contact-enquiries", enquiry);

  await sendMail({
    to: process.env.CONTACT_INBOX_EMAIL || "hello@edenlittleones.co.ke",
    subject: `New enquiry from ${parsed.data.name}`,
    text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone || "-"}\n\n${parsed.data.message}`,
  });

  return NextResponse.json({ success: true });
}
