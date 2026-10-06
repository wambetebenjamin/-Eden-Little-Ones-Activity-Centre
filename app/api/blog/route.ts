import { NextRequest, NextResponse } from "next/server";
import { getAllPostMeta, getPostBySlug } from "@/lib/blog";

// MDX article handler: /api/blog -> list metadata, /api/blog?slug=... -> full post.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (slug) {
    const post = getPostBySlug(slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  }
  return NextResponse.json({ posts: getAllPostMeta() });
}
