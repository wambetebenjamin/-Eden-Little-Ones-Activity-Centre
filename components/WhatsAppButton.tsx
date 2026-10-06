"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const DEFAULT_MESSAGE =
  "Hello! I would like to enquire about Eden Little Ones Activity Centre.";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <a
      href={buildWhatsAppLink(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="group fixed bottom-6 right-6 z-[80] flex h-14 w-14 animate-wa-bounce items-center justify-center rounded-full bg-[#25D366] text-white shadow-eden ring-4 ring-white transition-transform hover:scale-105"
      aria-label="Ask about activities or book a party on WhatsApp"
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
      <span
        className={`absolute bottom-full right-0 mb-3 w-56 rounded-eden bg-dark px-3 py-2 text-meta text-white shadow-eden transition-opacity ${
          showTooltip ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        Ask about activities or book a party
      </span>
    </a>
  );
}
