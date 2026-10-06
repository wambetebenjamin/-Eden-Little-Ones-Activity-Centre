import { NextRequest, NextResponse } from "next/server";
import { schoolBookingSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/server/recaptcha";
import { kvStore } from "@/lib/server/kv";
import { sendWhatsAppNotification } from "@/lib/server/whatsapp";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schoolBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const verification = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
  if (!verification.success) {
    return NextResponse.json({ success: false, needsV2Fallback: verification.needsV2Fallback }, { status: 200 });
  }

  const enquiry = { id: `school_${Date.now()}`, ...parsed.data, createdAt: new Date().toISOString() };
  await kvStore.lpush("eden:school-bookings", enquiry);

  await sendWhatsAppNotification(
    `New school group booking request:\nSchool: ${parsed.data.schoolName}\nTeacher: ${parsed.data.teacherName} (${parsed.data.phone}, ${parsed.data.email})\nChildren: ${parsed.data.numberOfChildren}, ages ${parsed.data.ages}\nPreferred date: ${parsed.data.preferredDate}\nActivities of interest: ${parsed.data.activitiesOfInterest}`
  );

  return NextResponse.json({ success: true, enquiry });
}
