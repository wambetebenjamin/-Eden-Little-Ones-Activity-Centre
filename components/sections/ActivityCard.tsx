"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Users, Calendar, Banknote } from "lucide-react";
import ActivityIcon from "@/components/ActivityIcon";
import { Activity } from "@/lib/data/activities";

export default function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 12) * 0.07 }}
      className="card-eden flex h-full flex-col overflow-hidden"
    >
      <div className="relative h-44 w-full">
        <Image src={activity.image} alt={activity.name} fill sizes="320px" className="object-cover" />
        <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary shadow">
          <ActivityIcon icon={activity.icon} size={18} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 text-lg">{activity.name}</h3>
        <p className="mb-3 text-body text-ink">{activity.shortDescription}</p>
        <ul className="mb-4 space-y-1.5 text-meta text-ink">
          <li className="flex items-center gap-2"><Users size={14} className="text-primary" /> Ages {activity.ageRange}</li>
          <li className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {activity.duration}</li>
          <li className="flex items-center gap-2"><Banknote size={14} className="text-primary" /> KES {activity.priceKES.toLocaleString()} per child</li>
          <li className="flex items-center gap-2"><Calendar size={14} className="text-primary" /> {activity.schedule}</li>
        </ul>
        <Link
          href={`/activities/${activity.slug}`}
          className="btn-eden btn-eden-primary mt-auto min-h-[48px] justify-center"
        >
          Book This Activity
        </Link>
      </div>
    </motion.div>
  );
}
