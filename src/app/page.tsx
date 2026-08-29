import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchTools } from "@/components/SearchTools";
import { FAQ } from "@/components/FAQ";
import { TOOLS, TOOLS_BY_CATEGORY } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function HomePage() {
  const popular = TOOLS.filter((t) => t.popular).slice(0, 12);
  const recent = [...TOOLS].reverse().slice(0, 6);
  const recentPosts = [...BLOG_POSTS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-200 bg-gradient-to-b from-white to-ink-50">
        <div className="container-narrow py-14 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-700">
              <Icon name="zap" size={12} className="text-brand-600" />
              Free, fast, privacy-friendly
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              {SITE_NAME}
            </h1>
            <p className="mt-3 text-base text-ink-700 sm:text-lg">
              {SITE_TAGLINE}
            </p>
            <p className="mt-1 text-sm text-ink-600">
              Fast, free online tools that work directly in your browser.
            </p>

            <div className="mx-auto mt-6 max-w-xl">
              <SearchTools placeholder="Search for a tool…" />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-500">
              <span>Popular:</span>
              {popular.slice(0, 4).map((t) => (
                <Link
                  key={t.id}
                  href={`/tools/${t.slug}`}
                  className="rounded-full border border-ink-200 bg-white px-2.5 py-1 font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-narrow py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="h-section">Browse by category</h2>
            <p className="mt-1 text-sm text-ink-600">
              Pick a category to explore the available tools.
            </p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <CategoryCard
              key={c.id}
              slug={c.slug}
              name={c.name}
              description={c.description}
              count={TOOLS_BY_CATEGORY[c.id]?.length ?? 0}
            />
          ))}
        </div>
      </section>

      {/* Popular tools */}
      <section className="container-narrow pb-12">
        <div className="mb-6 flex items-end justify-between gap-2">
          <div>
            <h2 className="h-section">Popular tools</h2>
            <p className="mt-1 text-sm text-ink-600">
              The most-used tools on {SITE_NAME}.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      {/* Why NetToolKit */}
      <section className="border-y border-ink-200 bg-ink-50">
        <div className="container-narrow py-12">
          <h2 className="h-section">Why {SITE_NAME}?</h2>
          <p className="mt-1 max-w-2xl text-sm text-ink-600">
            A focused, lightweight toolkit built around a simple promise: useful
            tools, instantly, without giving up your data.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div
                key={w.title}
                className="card p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon name={w.icon} size={20} />
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink-900">
                  {w.title}
                </h3>
                <p className="mt-1 text-sm text-ink-600">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-narrow py-12">
        <h2 className="h-section">Frequently asked questions</h2>
        <p className="mt-1 text-sm text-ink-600">
          Quick answers to the most common questions.
        </p>
        <div className="mt-6">
          <FAQ items={HOME_FAQ} />
        </div>
      </section>

      {/* Latest from the blog */}
      <section className="container-narrow py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="h-section">From the blog</h2>
            <p className="mt-1 text-sm text-ink-600">
              Practical guides and clear explanations.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            Read all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
            >
              <span className="text-xs font-medium text-brand-700">
                {p.category} · {p.readTime} min read
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink-900 group-hover:text-brand-700">
                {p.title}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm text-ink-600">
                {p.description}
              </p>
              <span className="mt-auto pt-3 text-xs text-ink-500">
                {new Date(p.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recently added */}
      <section className="container-narrow pb-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="h-section">Recently added</h2>
          <Link
            href="/tools"
            className="text-sm font-medium text-brand-700 hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>
    </>
  );
}

const WHY = [
  {
    icon: "zap" as const,
    title: "Free to use",
    desc: "Every tool on NetToolKit is free, with no hidden limits or paywalls.",
  },
  {
    icon: "shield" as const,
    title: "No registration",
    desc: "Use any tool instantly — no accounts, no signups, no emails.",
  },
  {
    icon: "clock" as const,
    title: "Fast",
    desc: "Built for speed. Pages load instantly and tools calculate in milliseconds.",
  },
  {
    icon: "lock" as const,
    title: "Privacy-friendly",
    desc: "Files are processed locally in your browser whenever technically possible.",
  },
  {
    icon: "mobile" as const,
    title: "Works on mobile",
    desc: "Mobile-first design that feels natural on phones and tablets.",
  },
  {
    icon: "globe" as const,
    title: "Built for the open web",
    desc: "Fast, accessible, SEO-friendly pages that load anywhere.",
  },
];

const HOME_FAQ = [
  {
    question: "Do I need to create an account?",
    answer:
      "No. All tools are free to use and require no registration, sign-in, or personal information.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "For tools that process files (such as image compression or format conversion), processing happens entirely in your browser using standard web APIs. Files are not uploaded to our servers. Calculators and unit converters never touch your files at all.",
  },
  {
    question: "Is NetToolKit really free?",
    answer:
      "Yes. The core tools are free to use. We may show non-intrusive advertisements on some pages to support the site, but every tool will always be free.",
  },
  {
    question: "Do the calculators account for overhead?",
    answer:
      "The calculators use theoretical maximums based on the size and speed you enter. Real-world speeds are usually lower due to protocol overhead, network conditions and other factors — see the FAQ on each tool for details.",
  },
  {
    question: "Can I use these tools on my phone?",
    answer:
      "Yes. The site is mobile-first and all tools work on modern phones, tablets and desktop browsers.",
  },
];
