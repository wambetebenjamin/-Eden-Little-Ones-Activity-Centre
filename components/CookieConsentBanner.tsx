"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, X } from "lucide-react";

// Fallback cookie consent banner — absent from BabyCare-1.0.0 (see
// SOURCE_AUDIT.md §7). Implements the brief's exact fallback spec: bottom
// fixed full-width banner, Accept All / Manage Preferences, a preferences
// modal with Necessary (locked) / Analytics / Marketing toggles, persisted to
// localStorage so it never repeats, with a Kenya Data Protection Act 2019 note.
const STORAGE_KEY = "eden-cookie-consent";

interface ConsentPrefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prefs, setPrefs] = useState<ConsentPrefs>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function persist(next: ConsentPrefs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setVisible(false);
    setShowModal(false);
  }

  function acceptAll() {
    persist({ necessary: true, analytics: true, marketing: true });
  }

  function savePreferences() {
    persist(prefs);
  }

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-light bg-white/98 px-4 py-5 shadow-eden backdrop-blur"
        role="dialog"
        aria-label="Cookie consent"
      >
        <div className="container-eden flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="max-w-2xl text-body text-ink">
            Eden Little Ones uses cookies to remember your booking preferences and
            improve our site. See our{" "}
            <Link href="/legal/cookie-policy" className="font-semibold text-primary underline">
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="btn-eden min-h-[48px] min-w-[48px] border-2 border-dark bg-transparent text-dark hover:bg-light"
            >
              Manage Preferences
            </button>
            <button onClick={acceptAll} className="btn-eden btn-eden-primary min-h-[48px] min-w-[48px]">
              Accept All
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-dark/50 px-4">
          <div className="w-full max-w-lg rounded-eden bg-white p-6 shadow-eden">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-primary" size={22} />
                <h3 className="text-xl">Cookie Preferences</h3>
              </div>
              <button
                aria-label="Close"
                onClick={() => setShowModal(false)}
                className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-light"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-4 text-body text-ink">
              In line with the Kenya Data Protection Act, 2019, you can choose which
              cookies Eden Little Ones Activity Centre may use. Necessary cookies keep
              the booking system working and cannot be disabled.
            </p>

            <div className="space-y-4">
              <PreferenceRow label="Necessary" description="Required for bookings to function." checked disabled />
              <PreferenceRow
                label="Analytics"
                description="Helps us understand how parents use the site."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <PreferenceRow
                label="Marketing"
                description="Lets us show relevant activity and party offers."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>

            <p className="mt-4 text-meta text-ink">
              Read our full{" "}
              <Link href="/legal/cookie-policy" className="text-primary underline">
                Cookie Policy
              </Link>{" "}
              for details.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={savePreferences}
                className="btn-eden border-2 border-dark bg-transparent text-dark hover:bg-light"
              >
                Save Preferences
              </button>
              <button onClick={acceptAll} className="btn-eden btn-eden-primary">
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PreferenceRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-eden border border-light p-3">
      <div>
        <p className="font-semibold text-dark">{label}</p>
        <p className="text-meta text-ink">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-light"
        } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
