"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Fallback loading screen (brief section "LOADING SCREEN: ... If absent:").
// Not present in the BabyCare-1.0.0 source (see SOURCE_AUDIT.md §6), so this
// implements the brief's exact fallback spec:
//   - Eden Little Ones logo bounces in from above
//   - three coloured dots below pulse in sequence
//   - a progress bar fills below the dots
//   - page fades in on completion, under 2 seconds total
//   - bouncy animation stays subtle and respects the user's motion preference
const TOTAL_MS = 1400;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setProgress(100);
      setVisible(false);
      return;
    }

    const start = Date.now();
    const raf = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(raf);
      } else {
        setTimeout(() => setVisible(false), 150);
      }
    };
    const frame = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-label="Eden Little Ones is loading"
          role="status"
        >
          <motion.div
            initial={{ y: -140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="mb-8 flex flex-col items-center"
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-blob bg-primary text-3xl font-bold text-white shadow-eden"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              E
            </div>
            <p className="mt-3 text-center font-display text-lg font-semibold text-dark">
              Eden <span className="text-primary">Little Ones</span>
            </p>
          </motion.div>

          <div className="mb-6 flex gap-3">
            {["bg-primary", "bg-secondary", "bg-dark"].map((color, i) => (
              <span
                key={color}
                className={`h-3 w-3 rounded-full ${color} animate-dot-pulse`}
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>

          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-light">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${progress}%`, transitionDuration: "80ms" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
