"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Camera } from "lucide-react";
import { galleryImages, GalleryImage } from "@/lib/data/gallery";

const FILTERS: (GalleryImage["category"] | "All")[] = ["All", "Arts", "Science", "Outdoor", "Parties"];

export default function GallerySection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = filter === "All" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="bg-light py-20">
      <div className="container-eden">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow mb-4"><Camera size={14} className="mr-1 inline" /> Gallery</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Moments from Eden Little Ones</h2>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn-eden min-h-[48px] ${
                filter === f ? "btn-eden-primary" : "border-2 border-dark bg-white text-dark hover:bg-primary/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="masonry">
          {filtered.map((image, i) => (
            <motion.button
              key={image.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 12) * 0.06 }}
              onClick={() => setLightbox(image)}
              className="block w-full overflow-hidden rounded-eden shadow-eden-sm"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={300 + (i % 3) * 60}
                className="h-auto w-full object-cover transition-transform hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-dark/80 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X size={24} />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              width={1200}
              height={800}
              className="h-auto w-full rounded-eden object-contain"
            />
            <p className="mt-3 text-center text-body text-white">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
