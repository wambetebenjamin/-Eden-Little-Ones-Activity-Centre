import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostMeta, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPostMeta().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      images: [{ url: post.meta.coverImage }],
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="container-eden max-w-3xl py-16">
      <p className="mb-2 text-meta text-ink">
        {new Date(post.meta.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })} · {post.meta.author}
      </p>
      <h1 className="mb-6 text-3xl sm:text-4xl">{post.meta.title}</h1>
      <div className="relative mb-8 h-64 w-full overflow-hidden rounded-eden sm:h-96">
        <Image src={post.meta.coverImage} alt={post.meta.title} fill sizes="768px" className="object-cover" />
      </div>
      <div className="prose-eden space-y-4 text-body text-ink [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-dark [&_a]:text-primary [&_a]:underline">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
