import * as React from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { RelatedTools } from "./RelatedTools";
import { FAQ } from "./FAQ";
import { Icon } from "./Icon";
import { PrivacyNotice } from "./PrivacyNotice";
import type { ToolMeta } from "@/lib/types";
import { CATEGORY_MAP } from "@/lib/categories";

interface ToolLayoutProps {
  tool: ToolMeta;
  children: React.ReactNode; // the actual tool UI
  howItWorks?: React.ReactNode;
  examples?: React.ReactNode;
  faqs?: { question: string; answer: React.ReactNode }[];
  related?: ToolMeta[];
  /** Optional small ad slot placeholder — never used for fake ads. */
  showAdSlot?: boolean;
}

export function ToolLayout({
  tool,
  children,
  howItWorks,
  examples,
  faqs,
  related,
  showAdSlot = true,
}: ToolLayoutProps) {
  const cat = CATEGORY_MAP[tool.category];
  const crumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
  ];
  if (cat) {
    crumbs.push({
      label: cat.name,
      href: `/category/${cat.slug}`,
    });
  }
  crumbs.push({ label: tool.name });

  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs items={crumbs} />

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {cat && (
            <Link
              href={`/category/${cat.slug}`}
              className="rounded-full bg-ink-100 px-2.5 py-0.5 font-medium text-ink-700 hover:bg-ink-200"
            >
              {cat.name}
            </Link>
          )}
          {tool.clientSide && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
              <Icon name="lock" size={12} />
              Runs in your browser
            </span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-2 max-w-2xl text-base text-ink-600 sm:text-lg">
          {tool.description}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-5 sm:p-6">{children}</div>
        </div>
        <aside className="space-y-6">
          {tool.clientSide && <PrivacyNotice />}
          <div className="card p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
              Quick facts
            </h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Category</dt>
                <dd className="font-medium text-ink-900">
                  {cat ? (
                    <Link
                      href={`/category/${cat.slug}`}
                      className="hover:underline"
                    >
                      {cat.name}
                    </Link>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Cost</dt>
                <dd className="font-medium text-ink-900">Free</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Registration</dt>
                <dd className="font-medium text-ink-900">Not required</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-600">Processing</dt>
                <dd className="font-medium text-ink-900">
                  {tool.clientSide ? "In your browser" : "Instant"}
                </dd>
              </div>
            </dl>
          </div>
          {showAdSlot && (
            <div
              aria-label="Advertisement"
              className="card-soft flex min-h-[120px] items-center justify-center p-4 text-center text-xs text-ink-400"
            >
              <span>Advertisement</span>
            </div>
          )}
        </aside>
      </div>

      {howItWorks && (
        <section className="prose-body mt-12 max-w-none">
          <h2>How it works</h2>
          {howItWorks}
        </section>
      )}

      {examples && (
        <section className="prose-body mt-12 max-w-none">
          <h2>Examples</h2>
          {examples}
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold text-ink-900">
            Frequently asked questions
          </h2>
          <FAQ items={faqs} />
        </section>
      )}

      {related && related.length > 0 && (
        <div className="mt-12">
          <RelatedTools tools={related} />
        </div>
      )}
    </div>
  );
}

// Local import alias for Link
import Link from "next/link";
