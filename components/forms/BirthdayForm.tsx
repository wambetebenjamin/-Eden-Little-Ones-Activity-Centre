"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { birthdaySchema } from "@/lib/schemas";
import { TextField, SelectField, TextAreaField, FormStatus } from "@/components/forms/fields";
import RecaptchaV2Widget from "@/components/forms/RecaptchaV2Widget";
import { useRecaptchaV3 } from "@/lib/useRecaptchaV3";
import { birthdayPackages } from "@/lib/data/packages";

type FormValues = {
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  childAge: string;
  preferredDate: string;
  numberOfGuests: string;
  selectedPackage: string;
  notes: string;
};

export default function BirthdayForm({ defaultPackage }: { defaultPackage?: string }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { selectedPackage: defaultPackage ?? birthdayPackages[0].slug },
  });
  const { getToken } = useRecaptchaV3();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [needsV2, setNeedsV2] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  async function submit(values: FormValues, v2Token?: string) {
    const parsed = birthdaySchema.safeParse(values);
    if (!parsed.success) return;
    const recaptchaToken = v2Token ?? (await getToken("birthday"));
    const res = await fetch("/api/birthday", {
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
      <TextField label="Child's Name" required register={register("childName")} error={errors.childName?.message} />
      <TextField label="Child's Age" type="number" required register={register("childAge")} error={errors.childAge?.message} />
      <TextField label="Preferred Date" type="date" required register={register("preferredDate")} error={errors.preferredDate?.message} />
      <TextField label="Number of Guests" type="number" required register={register("numberOfGuests")} error={errors.numberOfGuests?.message} />
      <SelectField label="Package" required register={register("selectedPackage")} error={errors.selectedPackage?.message}>
        {birthdayPackages.map((p) => (
          <option key={p.slug} value={p.slug}>{p.name}</option>
        ))}
      </SelectField>
      <div className="sm:col-span-2">
        <TextAreaField label="Notes" register={register("notes")} placeholder="Allergies, theme ideas, anything else we should know" />
      </div>
      {needsV2 && (
        <div className="sm:col-span-2">
          <RecaptchaV2Widget onToken={(token) => pendingValues && submit(pendingValues, token)} />
        </div>
      )}
      <button type="submit" className="btn-eden btn-eden-primary sm:col-span-2">
        Enquire for My Child&apos;s Birthday
      </button>
      <div className="sm:col-span-2">
        <FormStatus status={status} />
      </div>
    </form>
  );
}
