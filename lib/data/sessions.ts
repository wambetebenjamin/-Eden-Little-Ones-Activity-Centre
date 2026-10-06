import { activities } from "./activities";

// Weekday-recurring session template per activity, matching each activity's
// "schedule" copy in lib/data/activities.ts. Used to generate concrete
// upcoming calendar sessions for the /book availability calendar.
export interface RecurringSession {
  activitySlug: string;
  weekdays: number[]; // 0 = Sunday ... 6 = Saturday
  time: string;
  capacity: number;
}

export const recurringSessions: RecurringSession[] = [
  { activitySlug: "arts-and-crafts", weekdays: [2, 4], time: "9:00 AM", capacity: 12 },
  { activitySlug: "storytelling", weekdays: [1, 3, 5], time: "10:00 AM", capacity: 15 },
  { activitySlug: "music-and-rhythm", weekdays: [3], time: "11:00 AM", capacity: 14 },
  { activitySlug: "cooking-for-kids", weekdays: [6], time: "9:00 AM", capacity: 10 },
  { activitySlug: "science-lab", weekdays: [2, 4], time: "2:00 PM", capacity: 12 },
  { activitySlug: "dance-and-movement", weekdays: [1, 3], time: "4:00 PM", capacity: 16 },
  { activitySlug: "outdoor-adventure", weekdays: [6], time: "10:30 AM", capacity: 20 },
  { activitySlug: "coding-for-kids", weekdays: [2, 4], time: "4:00 PM", capacity: 10 },
  { activitySlug: "robotics-basics", weekdays: [6], time: "1:00 PM", capacity: 8 },
  { activitySlug: "drama-club", weekdays: [1, 3], time: "4:00 PM", capacity: 14 },
  { activitySlug: "nature-explorers", weekdays: [6], time: "9:00 AM", capacity: 15 },
  { activitySlug: "swimming-lessons", weekdays: [5], time: "3:00 PM", capacity: 8 },
];

export interface GeneratedSession {
  id: string;
  date: string; // YYYY-MM-DD
  time: string;
  activitySlug: string;
  activityName: string;
  ageRange: string;
  capacity: number;
  bookedCount: number;
}

export function generateUpcomingSessions(daysAhead = 42): GeneratedSession[] {
  const sessions: GeneratedSession[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const weekday = date.getDay();
    const isoDate = date.toISOString().slice(0, 10);

    for (const rs of recurringSessions) {
      if (!rs.weekdays.includes(weekday)) continue;
      const activity = activities.find((a) => a.slug === rs.activitySlug);
      if (!activity) continue;
      sessions.push({
        id: `${rs.activitySlug}-${isoDate}-${rs.time.replace(/[^0-9A-Za-z]/g, "")}`,
        date: isoDate,
        time: rs.time,
        activitySlug: activity.slug,
        activityName: activity.name,
        ageRange: activity.ageRange,
        capacity: rs.capacity,
        bookedCount: 0,
      });
    }
  }
  return sessions;
}
