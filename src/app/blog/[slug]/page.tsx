import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQ } from "@/components/FAQ";
import { Icon } from "@/components/Icon";
import {
  BLOG_POSTS,
  getBlogPost,
  type BlogPost,
} from "@/lib/blog";
import { getRelatedTools, getTool } from "@/lib/tools";
import { SITE_NAME, breadcrumbJsonLd, faqJsonLd, pageUrl, toolUrl } from "@/lib/site";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    alternates: { canonical: pageUrl(`/blog/${post.slug}`) },
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
      url: pageUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.description,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const relatedTools = post.relatedTools
    .map((slug) => getTool(slug))
    .filter((t): t is NonNullable<ReturnType<typeof getTool>> => Boolean(t));

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildArticleJsonLd(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: pageUrl("/") },
              { name: "Blog", url: pageUrl("/blog") },
              { name: post.title, url: pageUrl(`/blog/${post.slug}`) },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqJsonLd(
              post.faqs.map((f) => ({
                question: f.question,
                answer: f.answer,
              })),
            ),
          ),
        }}
      />

      <article className="container-narrow py-8 sm:py-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mt-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-medium text-brand-700">
              {post.category}
            </span>
            <span className="text-ink-500">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="text-ink-500">· {post.readTime} min read</span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-ink-600">{post.description}</p>
        </header>

        <div className="prose-body mt-10 max-w-3xl">{post.content}</div>

        {/* Related tools */}
        {relatedTools.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="mb-4 text-xl font-semibold text-ink-900">
              Related tools
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  href={toolUrl(t.slug)}
                  className="group flex items-start gap-3 rounded-xl border border-ink-200 bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100">
                    <Icon name={t.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                      {t.name}
                    </span>
                    <span className="block text-xs text-ink-600">
                      {t.shortDescription}
                    </span>
                  </span>
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="mt-2 shrink-0 text-ink-400 group-hover:text-brand-700"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {post.faqs.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2 className="mb-4 text-2xl font-semibold text-ink-900">
              Frequently asked questions
            </h2>
            <FAQ items={post.faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
          </section>
        )}

        {/* More articles */}
        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-semibold text-ink-900">
              Keep reading
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-4 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
                >
                  <span className="text-xs font-medium text-brand-700">
                    {p.category}
                  </span>
                  <span className="mt-1 text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                    {p.title}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs text-ink-600">
                    {p.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}

function buildArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription ?? post.description,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    datePublished: post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl(`/blog/${post.slug}`),
    },
  };
}
