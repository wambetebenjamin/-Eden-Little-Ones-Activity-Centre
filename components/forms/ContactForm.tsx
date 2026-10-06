"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "@/lib/schemas";
import { TextField, TextAreaField, FormStatus } from "@/components/forms/fields";
import RecaptchaV2Widget from "@/components/forms/RecaptchaV2Widget";
import { useRecaptchaV3 } from "@/lib/useRecaptchaV3";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const { getToken } = useRecaptchaV3();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [needsV2, setNeedsV2] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  async function submit(values: FormValues, v2Token?: string) {
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) return;
    const recaptchaToken = v2Token ?? (await getToken("contact"));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, recaptchaToken }),
    });
    const data = await res.json();
    if (data.needsV2Fallback) {
      setNeedsV2(true);
      setPendingValues(values);
      return;
    }
    if (data.success) {
      setStatus("success");
      setNeedsV2(false);
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit((v) => submit(v))}
      className="space-y-4 rounded-eden bg-white p-6 shadow-eden"
    >
      <TextField label="Your Name" required register={register("name")} error={errors.name?.message} />
      <TextField label="Email" type="email" required register={register("email")} error={errors.email?.message} />
      <TextField label="Phone (optional)" register={register("phone")} error={errors.phone?.message} />
      <TextAreaField label="Message" required register={register("message")} error={errors.message?.message} />
      {needsV2 && (
        <RecaptchaV2Widget
          onToken={(token) => pendingValues && submit(pendingValues, token)}
        />
      )}
      <button type="submit" className="btn-eden btn-eden-primary w-full">
        Send Message
      </button>
      <FormStatus status={status} />
    </form>
  );
}
