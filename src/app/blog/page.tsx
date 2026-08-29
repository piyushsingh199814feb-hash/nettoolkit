import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_NAME, pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Blog — ${SITE_NAME}`,
  description:
    "Practical guides on internet speeds, file formats, image compression and more. From the makers of NetToolKit.",
  alternates: { canonical: pageUrl("/blog") },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description:
      "Practical guides on internet speeds, file formats, image compression and more.",
    url: pageUrl("/blog"),
    type: "website",
  },
};

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const [featured, ...rest] = sorted;

  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />
      <header className="mt-4">
        <h1 className="h-tool">Blog</h1>
        <p className="mt-2 max-w-2xl text-base text-ink-600">
          Practical guides, deep dives and clear explanations for the things
          our tools help with. Written for non-experts.
        </p>
      </header>

      <section className="mt-8">
        <ArticleCard post={featured} featured />
      </section>

      {rest.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-semibold text-ink-900">More articles</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {rest.map((p) => (
              <ArticleCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
