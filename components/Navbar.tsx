"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarDays } from "lucide-react";

const NAV_LINKS = [
  { href: "/#hero", label: "Home" },
  { href: "/#activities", label: "Activities" },
  { href: "/#birthday", label: "Birthday Parties" },
  { href: "/schools", label: "School Groups" },
  { href: "/#membership", label: "Membership" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-[70] w-full transition-shadow ${
        scrolled ? "bg-white/95 shadow-eden backdrop-blur" : "bg-white"
      }`}
    >
      <nav className="container-eden flex h-[92px] items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Eden Little Ones home">
          <span className="flex h-11 w-11 items-center justify-center rounded-blob bg-primary text-lg font-bold text-white">
            E
          </span>
          <span className="font-display text-xl font-semibold leading-tight text-dark">
            Eden <span className="text-primary">Little Ones</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-chip px-3 py-2 text-nav font-semibold text-dark transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="btn-eden btn-eden-primary hidden min-h-[48px] md:inline-flex"
          >
            <CalendarDays size={16} />
            Book Now
          </Link>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full text-dark hover:bg-light xl:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[75] bg-dark/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-[80] flex w-[80%] max-w-sm flex-col bg-white p-6 shadow-eden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-dark">Menu</span>
                <button
                  className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-light"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="min-h-[48px] rounded-eden px-3 py-3 text-base font-semibold text-dark hover:bg-light hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="btn-eden btn-eden-primary mt-6 min-h-[48px] justify-center"
              >
                <CalendarDays size={16} />
                Book Now
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
