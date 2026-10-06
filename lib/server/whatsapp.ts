// WhatsApp Cloud API notification helper (server only).
// Requires WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_NOTIFY_TO env
// vars in production. Falls back to a console log so form submissions never
// fail just because notifications are not configured in this environment.
export async function sendWhatsAppNotification(message: string): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const notifyTo = process.env.WHATSAPP_NOTIFY_TO;

  if (!token || !phoneNumberId || !notifyTo) {
    console.log("[whatsapp:dev-fallback]", message);
    return;
  }

  try {
    await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: notifyTo,
        type: "text",
        text: { body: message },
      }),
    });
  } catch (err) {
    console.error("[whatsapp] failed to send notification", err);
  }
}

export { EDEN_WHATSAPP_NUMBER, buildWhatsAppLink } from "@/lib/whatsapp";
