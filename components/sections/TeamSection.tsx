"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { team } from "@/lib/data/team";

export default function TeamSection() {
  return (
    <section className="bg-cream py-20">
      <div className="container-eden">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4">Our Team</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Meet the Facilitators</h2>
          <p className="text-body text-ink">
            Qualified, vetted and genuinely passionate about children&apos;s development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.07 }}
              className="card-eden overflow-hidden"
            >
              <div className="relative h-56 w-full">
                <Image src={member.image} alt={member.name} fill sizes="320px" className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-lg">{member.name}</h3>
                <p className="mb-2 text-nav font-semibold text-primary">{member.specialisation}</p>
                <p className="mb-2 text-meta text-ink">{member.qualifications}</p>
                <p className="text-body text-ink">Fun fact: {member.funFact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
