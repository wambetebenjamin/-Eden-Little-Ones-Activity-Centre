"use client";

import { motion } from "framer-motion";
import { Shield, UserCheck, HeartPulse, Download } from "lucide-react";

const points = [
  {
    icon: Shield,
    title: "Child Safeguarding Policy",
    text: "Every facilitator follows our written safeguarding policy, aligned with the Children Act (Kenya), covering supervision ratios, reporting procedures and a strict no-unsupervised-contact rule.",
  },
  {
    icon: UserCheck,
    title: "Staff Vetting Process",
    text: "All staff undergo background checks, reference verification and a supervised probation period before working unsupervised with children.",
  },
  {
    icon: HeartPulse,
    title: "First Aid Certified Staff",
    text: "Every facilitator is First Aid certified, and a qualified first aider is on site throughout every session and event.",
  },
];

export default function SafeguardingSection() {
  return (
    <section className="bg-dark py-20 text-white">
      <div className="container-eden">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4 border-white text-white">Safety First</span>
          <h2 className="mb-4 text-3xl text-white sm:text-4xl">
            Your Child&apos;s Safety Is Our First Priority
          </h2>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="rounded-eden bg-white/5 p-6"
            >
              <p.icon size={28} className="mb-4 text-primary" />
              <h3 className="mb-2 text-lg text-white">{p.title}</h3>
              <p className="text-body text-white/75">{p.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/documents/safeguarding-policy.pdf"
            download
            className="btn-eden btn-eden-primary mx-auto inline-flex min-h-[48px]"
          >
            <Download size={16} /> Download Full Safeguarding Policy PDF
          </a>
        </div>
      </div>
    </section>
  );
}
