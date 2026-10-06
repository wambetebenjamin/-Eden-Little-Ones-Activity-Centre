"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Cake } from "lucide-react";
import { ageGroups, AgeGroup } from "@/lib/data/activities";

const HeroThree = dynamic(() => import("@/components/HeroThree"), { ssr: false });

const HEADLINE = "Where Children Learn Through Play.";

export default function HeroSection({ onSelectGroup }: { onSelectGroup: (g: AgeGroup) => void }) {
  const words = HEADLINE.split(" ");

  function handleFilterClick(group: AgeGroup) {
    onSelectGroup(group);
    document.getElementById("activities")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="East African children playing and doing art activities together"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/35 to-dark/60" />
        <HeroThree />
      </div>

      <div className="container-eden flex min-h-[86vh] flex-col justify-center py-24 text-white">
        <span className="eyebrow mb-6 w-fit border-white text-white">Lavington, Nairobi</span>
        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: words.length * 0.1 + 0.2 }}
          className="mb-10 max-w-xl text-lg text-white/90"
        >
          Nairobi&apos;s favourite activity centre for ages 2 to 12.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: words.length * 0.1 + 0.4 }}
          className="mb-14 flex flex-wrap gap-4"
        >
          <Link href="/book" className="btn-eden btn-eden-primary min-h-[48px]">
            <CalendarCheck size={16} /> Book an Activity
          </Link>
          <a href="#birthday" className="btn-eden btn-eden-outline min-h-[48px]">
            <Cake size={16} /> Plan a Birthday Party
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: words.length * 0.1 + 0.55 }}
          className="flex flex-wrap gap-3"
        >
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleFilterClick(group.id)}
              className="min-h-[48px] rounded-chip border border-white/40 bg-white/10 px-4 py-2 text-nav font-semibold text-white backdrop-blur transition hover:bg-white hover:text-primary"
            >
              {group.label} {group.range}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
