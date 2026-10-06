// Client-safe WhatsApp helpers (no server env vars here).
export const EDEN_WHATSAPP_NUMBER = "254112272061";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${EDEN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
