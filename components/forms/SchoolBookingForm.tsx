"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { schoolBookingSchema } from "@/lib/schemas";
import { TextField, TextAreaField, FormStatus } from "@/components/forms/fields";
import RecaptchaV2Widget from "@/components/forms/RecaptchaV2Widget";
import { useRecaptchaV3 } from "@/lib/useRecaptchaV3";

type FormValues = {
  schoolName: string;
  teacherName: string;
  phone: string;
  email: string;
  numberOfChildren: string;
  ages: string;
  preferredDate: string;
  activitiesOfInterest: string;
};

export default function SchoolBookingForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const { getToken } = useRecaptchaV3();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [needsV2, setNeedsV2] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);

  async function submit(values: FormValues, v2Token?: string) {
    const parsed = schoolBookingSchema.safeParse(values);
    if (!parsed.success) return;
    const recaptchaToken = v2Token ?? (await getToken("school_booking"));
    const res = await fetch("/api/school-booking", {
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
      <TextField label="School Name" required register={register("schoolName")} error={errors.schoolName?.message} />
      <TextField label="Teacher Name" required register={register("teacherName")} error={errors.teacherName?.message} />
      <TextField label="Phone" required register={register("phone")} error={errors.phone?.message} />
      <TextField label="Email" type="email" required register={register("email")} error={errors.email?.message} />
      <TextField label="Number of Children" type="number" required register={register("numberOfChildren")} error={errors.numberOfChildren?.message} />
      <TextField label="Ages" required placeholder="e.g. 6 to 9 years" register={register("ages")} error={errors.ages?.message} />
      <TextField label="Preferred Date" type="date" required register={register("preferredDate")} error={errors.preferredDate?.message} />
      <div className="sm:col-span-2">
        <TextAreaField
          label="Activities of Interest"
          required
          placeholder="e.g. Science Lab, Nature Explorers, Drama Club"
          register={register("activitiesOfInterest")}
          error={errors.activitiesOfInterest?.message}
        />
      </div>
      {needsV2 && (
        <div className="sm:col-span-2">
          <RecaptchaV2Widget onToken={(token) => pendingValues && submit(pendingValues, token)} />
        </div>
      )}
      <button type="submit" className="btn-eden btn-eden-primary sm:col-span-2">
        Request Group Booking
      </button>
      <div className="sm:col-span-2">
        <FormStatus status={status} />
      </div>
    </form>
  );
}
