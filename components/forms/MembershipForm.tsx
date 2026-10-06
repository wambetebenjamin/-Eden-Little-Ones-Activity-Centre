"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { membershipSchema } from "@/lib/schemas";
import { TextField, SelectField, FormStatus } from "@/components/forms/fields";
import RecaptchaV2Widget from "@/components/forms/RecaptchaV2Widget";
import { useRecaptchaV3 } from "@/lib/useRecaptchaV3";
import { membershipTiers } from "@/lib/data/membership";

type FormValues = {
  parentName: string;
  phone: string;
  email: string;
  tier: string;
  numberOfChildren: string;
};

export default function MembershipForm({ defaultTier }: { defaultTier?: string }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { tier: defaultTier ?? membershipTiers[0].slug, numberOfChildren: "1" },
  });
  const { getToken } = useRecaptchaV3();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [needsV2, setNeedsV2] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  async function submit(values: FormValues, v2Token?: string) {
    const parsed = membershipSchema.safeParse(values);
    if (!parsed.success) return;
    const recaptchaToken = v2Token ?? (await getToken("membership"));
    const res = await fetch("/api/membership", {
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
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit((v) => submit(v))} className="grid gap-4 rounded-eden bg-white p-6 shadow-eden sm:grid-cols-2">
      <TextField label="Parent Name" required register={register("parentName")} error={errors.parentName?.message} />
      <TextField label="Phone" required register={register("phone")} error={errors.phone?.message} />
      <TextField label="Email" type="email" required register={register("email")} error={errors.email?.message} />
      <TextField label="Number of Children" type="number" required register={register("numberOfChildren")} error={errors.numberOfChildren?.message} />
      <div className="sm:col-span-2">
        <SelectField label="Membership Tier" required register={register("tier")} error={errors.tier?.message}>
          {membershipTiers.map((t) => (
            <option key={t.slug} value={t.slug}>{t.name} — {t.priceLabel}</option>
          ))}
        </SelectField>
      </div>
      {needsV2 && (
        <div className="sm:col-span-2">
          <RecaptchaV2Widget onToken={(token) => pendingValues && submit(pendingValues, token)} />
        </div>
      )}
      <button type="submit" className="btn-eden btn-eden-primary sm:col-span-2">
        Sign Up for Membership
      </button>
      <div className="sm:col-span-2">
        <FormStatus status={status} />
      </div>
    </form>
  );
}
