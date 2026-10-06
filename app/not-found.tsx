import Link from "next/link";
import Image from "next/image";
import { Compass } from "lucide-react";

// Fallback 404 — composition reused from BabyCare-1.0.0/404.html (page-header
// banner → icon → big code → heading → copy → single CTA), see
// SOURCE_AUDIT.md §10, with the brief's required copy and a Lucide icon.
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-light px-4 py-20 text-center">
      <div className="relative mb-6 h-40 w-40 overflow-hidden rounded-blob">
        <Image src="/images/hero/404-character.jpg" alt="A happy child playing" fill sizes="160px" className="object-cover" />
      </div>
      <Compass size={40} className="mb-4 text-primary" />
      <h1 className="mb-2 text-5xl text-dark">404</h1>
      <h2 className="mb-4 text-2xl text-dark">Oops! We could not find this page.</h2>
      <p className="mb-8 max-w-md text-body text-ink">
        The page you&apos;re looking for may have wandered off to play. Let&apos;s get you
        back to the fun.
      </p>
      <Link href="/" className="btn-eden btn-eden-primary min-h-[48px]">
        Back to Fun
      </Link>
    </div>
  );
}
