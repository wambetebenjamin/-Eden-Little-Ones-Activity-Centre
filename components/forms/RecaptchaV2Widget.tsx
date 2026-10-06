"use client";

import { useEffect, useRef } from "react";

const V2_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY;

// Rendered only when the server reports the v3 score was below 0.5, per the
// brief's "Fallback v2 if score under 0.5" requirement.
export default function RecaptchaV2Widget({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!V2_SITE_KEY) return;
    if (!document.getElementById("recaptcha-v2-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-v2-script";
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.grecaptcha && ref.current && !rendered.current) {
        rendered.current = true;
        window.grecaptcha.render(ref.current, {
          sitekey: V2_SITE_KEY,
          callback: onToken,
        });
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [onToken]);

  if (!V2_SITE_KEY) {
    return (
      <p className="text-meta text-ink">
        Additional verification required, but reCAPTCHA v2 is not configured in
        this environment.
      </p>
    );
  }

  return (
    <div className="my-2">
      <div ref={ref} />
    </div>
  );
}
