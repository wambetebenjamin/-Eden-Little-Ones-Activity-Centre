// Server-side reCAPTCHA verification.
// v3 (invisible) is tried first; if the score comes back under 0.5 the client
// is asked to complete a v2 checkbox challenge instead, which is verified here
// with the same function using the v2 secret.
interface VerifyResult {
  success: boolean;
  score?: number;
  needsV2Fallback: boolean;
  reason?: string;
}

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

export async function verifyRecaptcha(
  token: string | undefined,
  variant: "v3" | "v2" = "v3"
): Promise<VerifyResult> {
  if (!token) {
    return { success: false, needsV2Fallback: variant === "v3", reason: "missing-token" };
  }

  const secret =
    variant === "v3"
      ? process.env.RECAPTCHA_V3_SECRET_KEY
      : process.env.RECAPTCHA_V2_SECRET_KEY;

  if (!secret) {
    // No key configured (e.g. local/preview without secrets) — do not block
    // the user flow, but flag it clearly so it is visible in server logs.
    console.warn(
      `[recaptcha] ${variant.toUpperCase()} secret key not set — skipping verification (dev mode).`
    );
    return { success: true, needsV2Fallback: false };
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json();

    if (variant === "v2") {
      return { success: Boolean(data.success), needsV2Fallback: false };
    }

    const score = typeof data.score === "number" ? data.score : 0;
    if (data.success && score >= SCORE_THRESHOLD) {
      return { success: true, score, needsV2Fallback: false };
    }
    return { success: false, score, needsV2Fallback: true, reason: "low-score" };
  } catch (err) {
    console.error("[recaptcha] verification request failed", err);
    return { success: false, needsV2Fallback: variant === "v3", reason: "network-error" };
  }
}
