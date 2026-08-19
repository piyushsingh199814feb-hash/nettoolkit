import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolCard } from "@/components/ToolCard";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { TOOLS, TOOLS_BY_CATEGORY } from "@/lib/tools";
import { SITE_NAME, pageUrl } from "@/lib/site";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = CATEGORY_MAP[params.slug];
  if (!cat) return { title: "Category not found" };
  const count = TOOLS_BY_CATEGORY[cat.id]?.length ?? 0;
  return {
    title: `${cat.name} — ${SITE_NAME}`,
    description: `${cat.description} ${count} free tool${
      count === 1 ? "" : "s"
    } available.`,
    alternates: { canonical: pageUrl(`/category/${cat.slug}`) },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const cat = CATEGORY_MAP[params.slug];
  if (!cat) notFound();
  const tools = TOOLS_BY_CATEGORY[cat.id] ?? [];
  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: cat.name },
        ]}
      />
      <header className="mt-4">
        <h1 className="h-tool">{cat.name}</h1>
        <p className="mt-2 max-w-2xl text-base text-ink-600">
          {cat.description}
        </p>
        <p className="mt-2 text-sm text-ink-500">
          {tools.length} tool{tools.length === 1 ? "" : "s"}
        </p>
      </header>

      {tools.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-ink-300 p-10 text-center text-sm text-ink-500">
          No tools in this category yet.
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.id} tool={t} showCategory={false} />
          ))}
        </div>
      )}
    </div>
  );
}
