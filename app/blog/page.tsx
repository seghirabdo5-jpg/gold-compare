import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "مقالات عن الذهب والمجوهرات",
  description: "مقالات تشرح أسعار الذهب، الأعيرة، وكيفية اختيار متجر موثوق.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="section py-12 max-w-2xl mx-auto">
      <h1 className="font-display text-2xl font-bold text-ink mb-8 text-center">مقالات ومعلومات عن الذهب</h1>
      <div className="space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-5 block hover:border-gold transition-colors">
            <h2 className="font-medium text-ink mb-1">{p.title}</h2>
            <p className="text-sm text-muted">{p.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
