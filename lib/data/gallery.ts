export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "Arts" | "Science" | "Outdoor" | "Parties";
}

// Local fallback manifest used when Vercel Blob is not configured (see
// lib/server/blob.ts). Photos live in /public/images/gallery — see
// image-credits.md for sourcing.
export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "/images/gallery/gallery-1.jpg", alt: "Children painting at Eden Little Ones arts table", category: "Arts" },
  { id: "g2", src: "/images/gallery/gallery-2.jpg", alt: "Child mixing colours during an arts and crafts session", category: "Arts" },
  { id: "g3", src: "/images/gallery/gallery-3.jpg", alt: "Children doing a science experiment with a facilitator", category: "Science" },
  { id: "g4", src: "/images/gallery/gallery-4.jpg", alt: "Child looking through a magnifying glass outdoors", category: "Science" },
  { id: "g5", src: "/images/gallery/gallery-5.jpg", alt: "Children playing on an outdoor obstacle course", category: "Outdoor" },
  { id: "g6", src: "/images/gallery/gallery-6.jpg", alt: "Children running and playing in the garden", category: "Outdoor" },
  { id: "g7", src: "/images/gallery/gallery-7.jpg", alt: "Children celebrating a birthday party with balloons", category: "Parties" },
  { id: "g8", src: "/images/gallery/gallery-8.jpg", alt: "Birthday party table set up for a child's celebration", category: "Parties" },
  { id: "g9", src: "/images/gallery/gallery-9.jpg", alt: "Children drawing together at a craft table", category: "Arts" },
  { id: "g10", src: "/images/gallery/gallery-10.jpg", alt: "Children exploring plants in the nature garden", category: "Science" },
  { id: "g11", src: "/images/gallery/gallery-11.jpg", alt: "Children playing outdoor group games", category: "Outdoor" },
  { id: "g12", src: "/images/gallery/gallery-12.jpg", alt: "Children at a birthday party playing games", category: "Parties" },
];
