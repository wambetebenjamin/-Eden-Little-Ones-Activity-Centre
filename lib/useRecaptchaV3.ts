"use client";

import { useEffect } from "react";
import { loadRecaptchaV3Script, getRecaptchaV3Token } from "@/lib/recaptcha-client";

export function useRecaptchaV3() {
  useEffect(() => {
    loadRecaptchaV3Script();
  }, []);

  return { getToken: getRecaptchaV3Token };
}
