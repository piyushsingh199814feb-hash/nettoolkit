import Link from "next/link";
import { Icon } from "@/components/Icon";
import { ToolCard } from "@/components/ToolCard";
import { CategoryCard } from "@/components/CategoryCard";
import { SearchTools } from "@/components/SearchTools";
import { FAQ } from "@/components/FAQ";
import { TOOLS, TOOLS_BY_CATEGORY } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function HomePage() {
  const popular = TOOLS.filter((t) => t.popular).slice(0, 12);
  const recent = [...TOOLS].reverse().slice(0, 6);

  return (
    <>
      {/* Hero — Download and Upload calculators front and center */}
      <section className="border-b border-ink-200 bg-gradient-to-b from-white to-ink-50">
        <div className="container-narrow py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
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
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link
              href="/tools/download-time-calculator"
              className="group relative flex flex-col rounded-2xl border-2 border-brand-200 bg-white p-6 text-left transition-all hover:border-brand-500 hover:bg-brand-50/40 hover:shadow-lg sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="download" size={24} />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-ink-900 group-hover:text-brand-700">
                Download Time Calculator
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                How long will your download take? Enter the file size and your
                speed, get an instant estimate.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Open calculator
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
            <Link
              href="/tools/upload-time-calculator"
              className="group relative flex flex-col rounded-2xl border-2 border-brand-200 bg-white p-6 text-left transition-all hover:border-brand-500 hover:bg-brand-50/40 hover:shadow-lg sm:p-8"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="upload" size={24} />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-ink-900 group-hover:text-brand-700">
                Upload Time Calculator
              </h2>
              <p className="mt-1 text-sm text-ink-600">
                Estimate upload time for any file at your connection speed.
                Symmetric, mobile, fiber — all supported.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                Open calculator
                <Icon name="arrow-right" size={16} />
              </span>
            </Link>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="w-full max-w-xl">
              <SearchTools placeholder="Search all 12 tools…" />
            </div>
            <Link
              href="/tools"
              className="text-sm font-medium text-brand-700 hover:underline"
            >
              Or browse all tools →
            </Link>
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