"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Users, Clock } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";
import RecaptchaV2Widget from "@/components/forms/RecaptchaV2Widget";
import { FormStatus, TextField } from "@/components/forms/fields";
import { useRecaptchaV3 } from "@/lib/useRecaptchaV3";
import { bookingSchema } from "@/lib/schemas";
import { GeneratedSession } from "@/lib/data/sessions";

interface SessionWithAvailability extends GeneratedSession {
  spotsLeft: number;
}

type FormValues = {
  numberOfChildren: string;
  childrenAges: string;
  parentName: string;
  phone: string;
  email: string;
};

export default function BookingPageClient({
  sessions,
  preselectedActivity,
}: {
  sessions: SessionWithAvailability[];
  preselectedActivity?: string;
}) {
  const relevantSessions = useMemo(
    () => (preselectedActivity ? sessions.filter((s) => s.activitySlug === preselectedActivity) : sessions),
    [sessions, preselectedActivity]
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(
    relevantSessions[0]?.date ?? null
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
  const { getToken } = useRecaptchaV3();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [needsV2, setNeedsV2] = useState(false);
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null);
  const [depositNote, setDepositNote] = useState<string | null>(null);

  const sessionsForDate = relevantSessions.filter((s) => s.date === selectedDate);
  const selectedSession = relevantSessions.find((s) => s.id === selectedSessionId);

  async function submit(values: FormValues, v2Token?: string) {
    if (!selectedSessionId) return;
    const payload = { ...values, sessionId: selectedSessionId };
    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) return;
    const recaptchaToken = v2Token ?? (await getToken("booking"));
    const res = await fetch("/api/booking", {
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
      setDepositNote(data.deposit?.message ?? null);
      reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="container-eden py-14">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="eyebrow mb-4">Book an Activity</span>
        <h1 className="mb-4 text-3xl sm:text-4xl">Choose a Session</h1>
        <p className="text-body text-ink">
          Pick an available date, select a session, and secure your spot with a
          small M-Pesa deposit.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <BookingCalendar
            sessions={relevantSessions}
            selectedDate={selectedDate}
            onSelectDate={(d) => {
              setSelectedDate(d);
              setSelectedSessionId(null);
            }}
          />

          {selectedDate && (
            <div className="mt-5 space-y-3">
              <h3 className="text-lg">Sessions on {selectedDate}</h3>
              {sessionsForDate.length === 0 && (
                <p className="text-body text-ink">No sessions on this date.</p>
              )}
              {sessionsForDate.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSessionId(s.id)}
                  disabled={s.spotsLeft <= 0}
                  className={`flex w-full min-h-[48px] items-center justify-between rounded-eden border px-4 py-3 text-left ${
                    selectedSessionId === s.id
                      ? "border-primary bg-primary/10"
                      : "border-light bg-white hover:border-primary/50"
                  } ${s.spotsLeft <= 0 ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <span>
                    <span className="block font-semibold text-dark">{s.activityName}</span>
                    <span className="flex items-center gap-3 text-meta text-ink">
                      <Clock size={12} /> {s.time} <Users size={12} /> Ages {s.ageRange}
                    </span>
                  </span>
                  <span className="text-meta text-primary">{s.spotsLeft} spots left</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <form
            onSubmit={handleSubmit((v) => submit(v))}
            className="space-y-4 rounded-eden bg-white p-6 shadow-eden"
          >
            {selectedSession ? (
              <p className="rounded-eden bg-light px-4 py-3 text-body text-dark">
                Booking <strong>{selectedSession.activityName}</strong> on {selectedSession.date} at {selectedSession.time}
              </p>
            ) : (
              <p className="rounded-eden bg-light px-4 py-3 text-body text-ink">
                Select a date and session to continue.
              </p>
            )}

            <TextField label="Number of Children" type="number" required register={register("numberOfChildren")} error={errors.numberOfChildren?.message} />
            <TextField label="Children's Ages" placeholder="e.g. 4 and 6" required register={register("childrenAges")} error={errors.childrenAges?.message} />
            <TextField label="Parent Name" required register={register("parentName")} error={errors.parentName?.message} />
            <TextField label="Phone (for M-Pesa deposit)" required register={register("phone")} error={errors.phone?.message} />
            <TextField label="Email" type="email" required register={register("email")} error={errors.email?.message} />

            {needsV2 && (
              <RecaptchaV2Widget onToken={(token) => pendingValues && submit(pendingValues, token)} />
            )}

            <button
              type="submit"
              disabled={!selectedSessionId}
              className="btn-eden btn-eden-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              Pay Deposit &amp; Confirm Booking
            </button>
            <FormStatus status={status} />
            {depositNote && <p className="text-meta text-ink">{depositNote}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
