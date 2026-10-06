"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { membershipTiers } from "@/lib/data/membership";
import MembershipForm from "@/components/forms/MembershipForm";
import { Reveal } from "@/components/MotionReveal";

export default function MembershipSection() {
  const [selectedTier, setSelectedTier] = useState(membershipTiers[0].slug);

  return (
    <section id="membership" className="bg-light py-20">
      <div className="container-eden">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4">Membership</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Join the Eden Membership Programme</h2>
          <p className="text-body text-ink">
            Regular activity credits, birthday discounts and priority booking for
            your family.
          </p>
        </Reveal>

        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {membershipTiers.map((tier, i) => (
            <motion.div
              key={tier.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`card-eden flex flex-col p-6 ${
                selectedTier === tier.slug ? "ring-2 ring-primary" : ""
              }`}
            >
              <h3 className="mb-1 text-xl">{tier.name}</h3>
              <p className="mb-4 text-lg font-semibold text-primary">{tier.priceLabel}</p>
              <ul className="mb-4 flex-1 space-y-2 text-body text-ink">
                {tier.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-secondary" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mb-5 space-y-1 text-meta text-ink">
                <p>Activity credits: {tier.activityCredits}</p>
                <p>Birthday discount: {tier.birthdayDiscount}</p>
                <p>Priority booking: {tier.priorityBooking ? "Yes" : "No"}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedTier(tier.slug);
                  document.getElementById("membership-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-eden btn-eden-primary min-h-[48px] justify-center"
              >
                Sign Up for Membership
              </button>
            </motion.div>
          ))}
        </div>

        <div id="membership-form">
          <MembershipForm defaultTier={selectedTier} />
        </div>
      </div>
    </section>
  );
}
