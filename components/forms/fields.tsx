"use client";

import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface BaseProps {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function TextField({ label, error, register, type = "text", placeholder, required }: BaseProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-nav font-semibold text-dark">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="min-h-[48px] w-full rounded-eden border border-light bg-white px-4 py-2 text-body text-ink outline-none focus:border-primary"
        {...register}
      />
      {error && <span className="mt-1 block text-meta text-primary">{error}</span>}
    </label>
  );
}

export function TextAreaField({ label, error, register, placeholder, required }: BaseProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-nav font-semibold text-dark">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <textarea
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-eden border border-light bg-white px-4 py-3 text-body text-ink outline-none focus:border-primary"
        {...register}
      />
      {error && <span className="mt-1 block text-meta text-primary">{error}</span>}
    </label>
  );
}

export function SelectField({
  label,
  error,
  register,
  children,
  required,
}: {
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-nav font-semibold text-dark">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <select
        className="min-h-[48px] w-full rounded-eden border border-light bg-white px-4 py-2 text-body text-ink outline-none focus:border-primary"
        {...register}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-meta text-primary">{error}</span>}
    </label>
  );
}

export function FormStatus({ status }: { status: "idle" | "success" | "error" }) {
  if (status === "success") {
    return (
      <p className="rounded-eden bg-light px-4 py-3 text-body text-dark" role="status">
        Thank you! We have received your request and will be in touch on WhatsApp or email shortly.
      </p>
    );
  }
  if (status === "error") {
    return (
      <p className="rounded-eden bg-primary/10 px-4 py-3 text-body text-primary-dark" role="alert">
        Something went wrong sending your request. Please try again or WhatsApp us directly.
      </p>
    );
  }
  return null;
}
