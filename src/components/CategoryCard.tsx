import Link from "next/link";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/types";

const ICONS: Record<string, IconName> = {
  internet: "globe",
  file: "image",
  converters: "convert",
  calculators: "calculator",
};

interface CategoryCardProps {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export function CategoryCard({
  slug,
  name,
  description,
  count,
}: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="group flex h-full flex-col rounded-xl border border-ink-200 bg-white p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-700 group-hover:bg-brand-100">
        <Icon name={ICONS[slug] ?? "zap"} size={20} />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink-900 group-hover:text-brand-700">
        {name}
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-ink-600">{description}</p>
      <p className="mt-3 text-xs font-medium text-ink-500">
        {count} tool{count === 1 ? "" : "s"}
      </p>
    </Link>
  );
}
