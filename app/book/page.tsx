import type { Metadata } from "next";
import { generateUpcomingSessions } from "@/lib/data/sessions";
import { kvStore } from "@/lib/server/kv";
import BookingPageClient from "@/components/BookingPageClient";

// SSR for real-time availability, per the brief.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book an Activity",
  description: "Choose an available session and book your child's activity at Eden Little Ones Activity Centre, Lavington.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: { activity?: string };
}) {
  const sessions = generateUpcomingSessions();
  const bookedCounts = (await kvStore.get<Record<string, number>>("eden:booked-counts")) ?? {};
  const sessionsWithAvailability = sessions.map((s) => ({
    ...s,
    bookedCount: bookedCounts[s.id] ?? 0,
    spotsLeft: s.capacity - (bookedCounts[s.id] ?? 0),
  }));

  return (
    <BookingPageClient
      sessions={sessionsWithAvailability}
      preselectedActivity={searchParams.activity}
    />
  );
}
