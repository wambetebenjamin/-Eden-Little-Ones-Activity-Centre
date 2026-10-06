import { list } from "@vercel/blob";
import { galleryImages, type GalleryImage } from "@/lib/data/gallery";

// Reads the gallery image list from Vercel Blob when BLOB_READ_WRITE_TOKEN is
// configured; otherwise serves the local /public/images/gallery manifest so
// the gallery works without Blob storage provisioned.
export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return galleryImages;
  }
  try {
    const { blobs } = await list({ prefix: "gallery/" });
    if (!blobs.length) return galleryImages;
    return blobs.map((b, i) => ({
      id: `blob-${i}`,
      src: b.url,
      alt: "Eden Little Ones activity photo",
      category: "Arts" as const,
    }));
  } catch (err) {
    console.error("[blob] failed to list gallery images, using local fallback", err);
    return galleryImages;
  }
}
