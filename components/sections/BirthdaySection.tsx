"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Users, Clock, Cake } from "lucide-react";
import { birthdayPackages, partyAddOns } from "@/lib/data/packages";
import BirthdayForm from "@/components/forms/BirthdayForm";

export default function BirthdaySection() {
  const [selectedPackage, setSelectedPackage] = useState(birthdayPackages[0].slug);
  const [addOns, setAddOns] = useState<string[]>([]);

  function toggleAddOn(id: string) {
    setAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  return (
    <section id="birthday" className="bg-cream py-20">
      <div className="container-eden">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4">Birthday Parties</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Unforgettable Birthdays at Eden</h2>
          <p className="text-body text-ink">
            Three packages designed to make your child&apos;s birthday stress-free and
            full of play.
          </p>
        </div>

        <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {birthdayPackages.map((pkg, i) => (
            <motion.div
              key={pkg.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`card-eden flex flex-col overflow-hidden border-2 ${
                selectedPackage === pkg.slug ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="relative h-48 w-full">
                <Image src={pkg.image} alt={pkg.name} fill sizes="400px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-1 text-xl">{pkg.name}</h3>
                <p className="mb-4 text-lg font-semibold text-primary">
                  From KES {pkg.startingPriceKES.toLocaleString()}
                </p>
                <ul className="mb-4 space-y-2 text-body text-ink">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0 text-secondary" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mb-4 flex gap-4 text-meta text-ink">
                  <span className="flex items-center gap-1"><Users size={14} className="text-primary" /> Up to {pkg.maxChildren}</span>
                  <span className="flex items-center gap-1"><Clock size={14} className="text-primary" /> {pkg.duration}</span>
                </div>
                <p className="mb-5 text-meta text-ink">{pkg.venueSetup}</p>
                <button
                  onClick={() => {
                    setSelectedPackage(pkg.slug);
                    document.getElementById("birthday-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-eden btn-eden-primary mt-auto min-h-[48px] justify-center"
                >
                  <Cake size={16} /> Choose {pkg.name}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mb-10 rounded-eden bg-white p-6 shadow-eden">
          <h3 className="mb-4 text-lg">Add-ons</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {partyAddOns.map((addOn) => (
              <label
                key={addOn.id}
                className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-eden border border-light px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={addOns.includes(addOn.id)}
                  onChange={() => toggleAddOn(addOn.id)}
                  className="h-5 w-5 accent-primary"
                />
                <span className="text-body text-ink">
                  {addOn.label} <span className="text-meta text-primary">(+KES {addOn.priceKES.toLocaleString()})</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div id="birthday-form">
          <h3 className="mb-4 text-center text-2xl">Enquire for My Child&apos;s Birthday</h3>
          <BirthdayForm defaultPackage={selectedPackage} />
        </div>
      </div>
    </section>
  );
}
