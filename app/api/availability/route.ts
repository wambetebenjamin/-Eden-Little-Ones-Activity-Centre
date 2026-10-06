import { NextResponse } from "next/server";
import { generateUpcomingSessions } from "@/lib/data/sessions";
import { kvStore } from "@/lib/server/kv";

// Available session slots for the /book calendar, from Vercel KV (booked
// counts) merged onto the generated recurring-session template.
export async function GET() {
  const sessions = generateUpcomingSessions();
  const bookedCounts = (await kvStore.get<Record<string, number>>("eden:booked-counts")) ?? {};

  const withAvailability = sessions.map((s) => ({
    ...s,
    bookedCount: bookedCounts[s.id] ?? 0,
    spotsLeft: s.capacity - (bookedCounts[s.id] ?? 0),
  }));

  return NextResponse.json({ sessions: withAvailability });
}
