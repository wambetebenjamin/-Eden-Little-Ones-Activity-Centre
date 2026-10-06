import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/schemas";
import { verifyRecaptcha } from "@/lib/server/recaptcha";
import { kvStore } from "@/lib/server/kv";
import { generateUpcomingSessions } from "@/lib/data/sessions";
import { sendWhatsAppNotification } from "@/lib/server/whatsapp";
import { sendMail } from "@/lib/server/mailer";
import { initiateMpesaDeposit } from "@/lib/server/mpesa";
import { getActivityBySlug } from "@/lib/data/activities";

const DEPOSIT_KES = 500;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  const verification = await verifyRecaptcha(parsed.data.recaptchaToken, "v3");
  if (!verification.success) {
    return NextResponse.json({ success: false, needsV2Fallback: verification.needsV2Fallback }, { status: 200 });
  }

  const session = generateUpcomingSessions().find((s) => s.id === parsed.data.sessionId);
  if (!session) {
    return NextResponse.json({ success: false, message: "Session not found" }, { status: 404 });
  }

  const bookedCounts = (await kvStore.get<Record<string, number>>("eden:booked-counts")) ?? {};
  const currentBooked = bookedCounts[session.id] ?? 0;
  if (currentBooked + parsed.data.numberOfChildren > session.capacity) {
    return NextResponse.json({ success: false, message: "Not enough spots left in this session" }, { status: 409 });
  }

  bookedCounts[session.id] = currentBooked + parsed.data.numberOfChildren;
  await kvStore.set("eden:booked-counts", bookedCounts);

  const booking = {
    id: `bk_${Date.now()}`,
    ...parsed.data,
    sessionDate: session.date,
    sessionTime: session.time,
    activityName: session.activityName,
    createdAt: new Date().toISOString(),
  };
  await kvStore.lpush("eden:bookings", booking);

  const activity = getActivityBySlug(session.activitySlug);
  const deposit = await initiateMpesaDeposit({
    phone: parsed.data.phone,
    amountKES: DEPOSIT_KES,
    accountReference: booking.id,
    description: `Deposit for ${session.activityName}`,
  });

  const whatToBring = activity?.whatToBring?.join(", ") ?? "Comfortable clothing";
  const message = `New Eden Little Ones booking:\n${session.activityName} on ${session.date} at ${session.time}\nParent: ${parsed.data.parentName} (${parsed.data.phone})\nChildren: ${parsed.data.numberOfChildren} (ages ${parsed.data.childrenAges})`;
  await sendWhatsAppNotification(message);
  await sendMail({
    to: parsed.data.email,
    subject: "Your Eden Little Ones booking is confirmed",
    text: `Hi ${parsed.data.parentName},\n\nYour booking for ${session.activityName} on ${session.date} at ${session.time} is confirmed.\nWhat to bring: ${whatToBring}\n\nA KES ${DEPOSIT_KES} deposit request has been sent to your phone via M-Pesa.\n\nSee you soon!\nEden Little Ones Activity Centre, Lavington, Nairobi`,
  });

  return NextResponse.json({ success: true, booking, deposit });
}
