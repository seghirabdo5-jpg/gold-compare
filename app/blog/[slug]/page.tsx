import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/config/site.config";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.description };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.date,
    author: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <article className="section py-12 max-w-2xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <h1 className="font-display text-2xl font-bold text-ink mb-6">{post.meta.title}</h1>
      <div className="prose prose-sm max-w-none text-ink/90 leading-7 space-y-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => {
              const isCta = href === "/compare" || href === "/gold-calculator";
              if (isCta) {
                return (
                  <span className="block my-5 text-center">
                    <a
                      href={href}
                      className="inline-block bg-ink text-paper px-7 py-3 rounded-full font-medium no-underline hover:bg-gold-dark transition-colors"
                    >
                      {children}
                    </a>
                  </span>
                );
              }
              return (
                <a href={href} className="text-gold-dark underline">
                  {children}
                </a>
              );
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
