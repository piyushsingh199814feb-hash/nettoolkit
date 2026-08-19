import Link from "next/link";
import { Icon } from "./Icon";
import type { ToolMeta } from "@/lib/types";
import { CATEGORY_MAP } from "@/lib/categories";

interface ToolCardProps {
  tool: ToolMeta;
  showCategory?: boolean;
}

export function ToolCard({ tool, showCategory = true }: ToolCardProps) {
  const cat = CATEGORY_MAP[tool.category];
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <div className="flex items-start justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100">
          <Icon name={tool.icon} size={20} />
        </span>
        {showCategory && (
          <span className="rounded-full bg-ink-100 px-2 py-0.5 text-xs font-medium text-ink-600">
            {cat?.name ?? tool.category}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink-900 group-hover:text-brand-700">
        {tool.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-ink-600">
        {tool.shortDescription}
      </p>
      <div className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-brand-700 opacity-0 transition-opacity group-hover:opacity-100">
        Open
        <Icon name="arrow-right" size={16} />
      </div>
    </Link>
  );
}
