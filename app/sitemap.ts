import type { MetadataRoute } from "next";
import { activities } from "@/lib/data/activities";
import { getAllPostMeta } from "@/lib/blog";

const BASE_URL = "https://www.edenlittleones.co.ke";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/book", "/schools", "/blog", "/legal/privacy-policy", "/legal/terms", "/legal/cookie-policy"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })
  );

  const activityRoutes = activities.map((a) => ({
    url: `${BASE_URL}/activities/${a.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = getAllPostMeta().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...activityRoutes, ...blogRoutes];
}
