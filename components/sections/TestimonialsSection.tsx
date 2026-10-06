"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="bg-cream py-20">
      <div className="container-eden">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4">Testimonials</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Parents Say About Us</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.parentName}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card-eden flex flex-col p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary">
                  <Image src={t.image} alt={t.parentName} fill sizes="56px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-dark">{t.parentName}</p>
                  <p className="text-meta text-ink">Child aged {t.childAge} · {t.activity}</p>
                </div>
              </div>
              <div className="mb-3 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={idx < t.rating ? "fill-primary text-primary" : "text-light"}
                  />
                ))}
              </div>
              <p className="text-body text-ink">&ldquo;{t.review}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
