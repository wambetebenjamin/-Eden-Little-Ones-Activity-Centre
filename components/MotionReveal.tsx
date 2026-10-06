"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children" | "transition"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
}

/**
 * A reduced-motion friendly reveal that leaves content visible even before
 * client-side hydration. This keeps important copy readable if JavaScript is
 * delayed while still giving each section a gentle entrance on scroll.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  distance = 24,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 1, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -48px" }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Adds a small route-level lift without hiding page content on first paint. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 1, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
