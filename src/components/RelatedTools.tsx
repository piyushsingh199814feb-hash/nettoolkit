import Link from "next/link";
import { ToolCard } from "./ToolCard";
import type { ToolMeta } from "@/lib/tools";

export function RelatedTools({ tools }: { tools: ToolMeta[] }) {
  if (!tools.length) return null;
  return (
    <section aria-labelledby="related-tools">
      <h2
        id="related-tools"
        className="mb-4 text-xl font-semibold text-ink-900 sm:text-2xl"
      >
        Related tools
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <ToolCard key={t.id} tool={t} showCategory={false} />
        ))}
      </div>
      <div className="mt-6 text-sm">
        <Link
          href="/tools"
          className="font-medium text-brand-700 hover:underline"
        >
          See all tools →
        </Link>
      </div>
    </section>
  );
}
