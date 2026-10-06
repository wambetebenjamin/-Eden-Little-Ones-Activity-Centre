"use client";

// Client helper for invisible reCAPTCHA v3, with a v2 checkbox fallback when
// the server reports a low score. Site keys come from NEXT_PUBLIC_ env vars.
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      render: (container: HTMLElement, opts: { sitekey: string; callback: (t: string) => void }) => number;
    };
  }
}

const V3_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V3_SITE_KEY;

export function loadRecaptchaV3Script() {
  if (typeof window === "undefined" || !V3_SITE_KEY) return;
  if (document.getElementById("recaptcha-v3-script")) return;
  const script = document.createElement("script");
  script.id = "recaptcha-v3-script";
  script.src = `https://www.google.com/recaptcha/api.js?render=${V3_SITE_KEY}`;
  script.async = true;
  document.head.appendChild(script);
}

export async function getRecaptchaV3Token(action: string): Promise<string | undefined> {
  if (typeof window === "undefined" || !V3_SITE_KEY || !window.grecaptcha) {
    return undefined;
  }
  return new Promise((resolve) => {
    window.grecaptcha!.ready(async () => {
      try {
        const token = await window.grecaptcha!.execute(V3_SITE_KEY, { action });
        resolve(token);
      } catch {
        resolve(undefined);
      }
    });
  });
}
