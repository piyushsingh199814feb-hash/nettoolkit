"use client";

import * as React from "react";
import { ToolCard } from "@/components/ToolCard";
import { CATEGORIES } from "@/lib/categories";
import { TOOLS, searchTools, type ToolMeta } from "@/lib/tools";

type Filter = "all" | ToolMeta["category"] | "popular" | "recent";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...CATEGORIES.map((c) => ({ id: c.id as Filter, label: c.name })),
  { id: "popular", label: "Popular" },
  { id: "recent", label: "Recently added" },
];

export function ToolsBrowser() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [query, setQuery] = React.useState("");

  // Listen to global search input
  React.useEffect(() => {
    function onSearch(e: Event) {
      const ce = e as CustomEvent<{ q: string }>;
      setQuery(ce.detail?.q ?? "");
    }
    window.addEventListener("ntk:search", onSearch as EventListener);
    return () =>
      window.removeEventListener("ntk:search", onSearch as EventListener);
  }, []);

  // Also poll the URL hash for ?q= and a global .ntk-search-input
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") ?? "");
  }, []);

  const list = React.useMemo(() => {
    let base = searchTools(query);
    if (filter === "popular") base = base.filter((t) => t.popular);
    else if (filter === "recent") base = [...base].reverse();
    else if (filter !== "all")
      base = base.filter((t) => t.category === filter);
    return base;
  }, [filter, query]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={[
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
        <span className="ml-auto text-sm text-ink-500">
          {list.length} tool{list.length === 1 ? "" : "s"}
        </span>
      </div>

      {list.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-ink-300 p-10 text-center text-sm text-ink-500">
          No tools match your filters.
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      )}
    </div>
  );
}
