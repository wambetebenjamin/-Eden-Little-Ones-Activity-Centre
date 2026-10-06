"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecaptchaV3 } from "@/lib/useRecaptchaV3";

type FormValues = { email: string; childAgeGroup: "toddlers" | "explorers" | "tweens" };

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { childAgeGroup: "toddlers" },
  });
  const { getToken } = useRecaptchaV3();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(values: FormValues) {
    const recaptchaToken = await getToken("newsletter");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, recaptchaToken }),
    });
    const data = await res.json();
    setStatus(data.success ? "success" : "error");
    if (data.success) reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={compact ? "space-y-2" : "flex flex-col gap-3 sm:flex-row"}>
      <input
        type="email"
        placeholder="Your email"
        required
        className={`min-h-[48px] rounded-eden border border-light px-4 text-body text-ink outline-none focus:border-primary ${
          compact ? "w-full bg-white/10 text-white placeholder:text-white/50" : "flex-1 bg-white"
        }`}
        {...register("email")}
      />
      <select
        className={`min-h-[48px] rounded-eden border border-light px-3 text-nav outline-none focus:border-primary ${
          compact ? "bg-white/10 text-white" : "bg-white text-ink"
        }`}
        {...register("childAgeGroup")}
      >
        <option value="toddlers" className="text-ink">Toddlers 2-4</option>
        <option value="explorers" className="text-ink">Little Explorers 5-8</option>
        <option value="tweens" className="text-ink">Tweens 9-12</option>
      </select>
      <button type="submit" className="btn-eden btn-eden-primary min-h-[48px]">
        Subscribe
      </button>
      {status === "success" && <p className="text-meta text-secondary">Subscribed! Watch your inbox.</p>}
      {status === "error" && <p className="text-meta text-primary">Could not subscribe, please retry.</p>}
    </form>
  );
}
