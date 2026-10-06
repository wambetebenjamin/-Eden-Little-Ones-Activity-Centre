import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export default function BookActivityButton({ activitySlug }: { activitySlug: string }) {
  return (
    <Link
      href={`/book?activity=${activitySlug}`}
      className="btn-eden btn-eden-primary min-h-[48px] w-full justify-center"
    >
      <CalendarCheck size={16} /> Book Now
    </Link>
  );
}
