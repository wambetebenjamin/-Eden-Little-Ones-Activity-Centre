import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog & Parenting Tips",
  description: "Articles and tips for parents from Eden Little Ones Activity Centre, Lavington, Nairobi.",
};

export default function BlogIndexPage() {
  const posts = getAllPostMeta();

  return (
    <div className="container-eden py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="eyebrow mb-4">Blog &amp; Tips</span>
        <h1 className="mb-4 text-3xl sm:text-4xl">Articles for Parents</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="card-eden flex flex-col overflow-hidden">
            <div className="relative h-44 w-full">
              <Image src={post.coverImage} alt={post.title} fill sizes="400px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="mb-2 text-meta text-ink">{new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</p>
              <h2 className="mb-2 text-lg">{post.title}</h2>
              <p className="text-body text-ink">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
