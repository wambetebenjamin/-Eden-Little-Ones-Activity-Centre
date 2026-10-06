"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, Cake, ChevronDown } from "lucide-react";
import { ageGroups, AgeGroup } from "@/lib/data/activities";

const HeroThree = dynamic(() => import("@/components/HeroThree"), { ssr: false });

const HEADLINE = "Where Children Learn Through Play.";
const HERO_EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection({ onSelectGroup }: { onSelectGroup: (g: AgeGroup) => void }) {
  const words = HEADLINE.split(" ");
  const prefersReducedMotion = useReducedMotion();

  function handleFilterClick(group: AgeGroup) {
    onSelectGroup(group);
    document.getElementById("activities")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-dark">
      {/* Explicit layers keep the hero copy above both the photo and Three.js canvas. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/hero/hero-1.jpg"
          alt="East African children playing and doing art activities together"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-dark/75 via-dark/45 to-dark/80" />
        <div className="absolute inset-0 z-20 opacity-70">
          <HeroThree />
        </div>
      </div>

      <div className="container-eden relative z-30 flex min-h-[86vh] flex-col justify-center py-24 text-white">
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 1, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: HERO_EASE }}
          className="eyebrow mb-6 w-fit border-white text-white drop-shadow-md"
        >
          Lavington, Nairobi
        </motion.span>

        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={prefersReducedMotion ? false : { opacity: 1, y: -28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : {
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: words.length * 0.09 + 0.15, ease: HERO_EASE }}
          className="mb-10 max-w-xl text-lg text-white/95 drop-shadow-md"
        >
          Nairobi&apos;s favourite activity centre for ages 2 to 12.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: words.length * 0.09 + 0.3, ease: HERO_EASE }}
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
          initial={prefersReducedMotion ? false : { opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: words.length * 0.09 + 0.45, ease: HERO_EASE }}
          className="flex flex-wrap gap-3"
        >
          {ageGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => handleFilterClick(group.id)}
              className="min-h-[48px] rounded-chip border border-white/40 bg-white/10 px-4 py-2 text-nav font-semibold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-primary hover:shadow-lg"
            >
              {group.label} {group.range}
            </button>
          ))}
        </motion.div>

        <motion.a
          href="#activities"
          aria-label="Scroll to activities"
          initial={prefersReducedMotion ? false : { opacity: 0.7, y: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7], y: [0, 7, 0] }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/80 md:flex"
        >
          <span className="text-meta uppercase tracking-[0.2em]">Explore</span>
          <ChevronDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}
