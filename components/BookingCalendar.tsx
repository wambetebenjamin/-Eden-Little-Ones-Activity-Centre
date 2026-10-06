"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GeneratedSession } from "@/lib/data/sessions";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function BookingCalendar({
  sessions,
  selectedDate,
  onSelectDate,
}: {
  sessions: GeneratedSession[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}) {
  const [monthOffset, setMonthOffset] = useState(0);

  const { year, month, cells } = useMemo(() => {
    const base = new Date();
    base.setDate(1);
    base.setMonth(base.getMonth() + monthOffset);
    const year = base.getFullYear();
    const month = base.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: { date: string | null; day: number | null }[] = [];
    for (let i = 0; i < firstDay; i++) cells.push({ date: null, day: null });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      cells.push({ date: date.toISOString().slice(0, 10), day: d });
    }
    return { year, month, cells };
  }, [monthOffset]);

  const sessionsByDate = useMemo(() => {
    const map = new Map<string, GeneratedSession[]>();
    for (const s of sessions) {
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date)!.push(s);
    }
    return map;
  }, [sessions]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const monthLabel = new Date(year, month).toLocaleDateString("en-KE", { month: "long", year: "numeric" });

  return (
    <div className="w-full rounded-eden bg-white p-5 shadow-eden">
      <div className="mb-4 flex items-center justify-between">
        <button
          aria-label="Previous month"
          onClick={() => setMonthOffset((m) => Math.max(0, m - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-light"
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg">{monthLabel}</h3>
        <button
          aria-label="Next month"
          onClick={() => setMonthOffset((m) => m + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-light"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-meta font-semibold text-ink">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={monthOffset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 gap-1"
        >
          {cells.map((cell, i) => {
            if (!cell.date) return <span key={`empty-${i}`} />;
            const hasSessions = sessionsByDate.has(cell.date);
            const isPast = cell.date < todayStr;
            const isSelected = cell.date === selectedDate;
            return (
              <motion.button
                key={cell.date}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: i * 0.01 }}
                disabled={isPast || !hasSessions}
                onClick={() => cell.date && onSelectDate(cell.date)}
                className={`flex h-11 w-11 min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-eden text-nav transition-colors ${
                  isPast || !hasSessions
                    ? "text-ink/30"
                    : isSelected
                    ? "bg-primary text-white"
                    : "bg-light text-dark hover:bg-primary/20"
                }`}
              >
                {cell.day}
                {hasSessions && !isPast && (
                  <span className={`mt-0.5 h-1 w-1 rounded-full ${isSelected ? "bg-white" : "bg-primary"}`} />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
