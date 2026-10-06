import { NextResponse } from "next/server";
import { activities } from "@/lib/data/activities";
import { kvStore } from "@/lib/server/kv";

// Activity catalogue. Seeds Vercel KV on first call (or in-memory fallback in
// dev/preview without KV credentials — see lib/server/kv.ts), then serves
// from the store so it can be edited independently of the codebase later.
export const revalidate = 300;

export async function GET() {
  const cached = await kvStore.get<typeof activities>("eden:activities");
  if (cached) return NextResponse.json({ activities: cached });

  await kvStore.set("eden:activities", activities);
  return NextResponse.json({ activities });
}
