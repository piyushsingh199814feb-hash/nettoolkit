"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";
import { searchTools, type ToolMeta } from "@/lib/tools";

interface SearchToolsProps {
  compact?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
}

export function SearchTools({
  compact,
  autoFocus,
  className = "",
  placeholder = "Search for a tool…",
}: SearchToolsProps) {
  const router = useRouter();
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo<ToolMeta[]>(
    () => (q.trim() ? searchTools(q).slice(0, 8) : []),
    [q],
  );

  // Close on outside click
  React.useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(t: ToolMeta) {
    setOpen(false);
    setQ("");
    router.push(`/tools/${t.slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[highlight];
      if (target) go(target);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div
      ref={wrapRef}
      className={["relative", compact ? "w-full sm:w-64" : "w-full", className].join(
        " ",
      )}
    >
      <div className="relative">
        <span
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
          aria-hidden
        >
          <Icon name="search" size={18} />
        </span>
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="search-tools-listbox"
          aria-autocomplete="list"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setHighlight(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={[
            "h-10 w-full rounded-lg border border-ink-200 bg-white pl-10 pr-3 text-sm text-ink-900 placeholder-ink-400 outline-none transition-colors focus:border-brand-500",
          ].join(" ")}
        />
      </div>
      {open && results.length > 0 && (
        <ul
          id="search-tools-listbox"
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-2 max-h-96 overflow-auto rounded-xl border border-ink-200 bg-white p-1 shadow-lg"
        >
          {results.map((t, idx) => (
            <li key={t.id} role="option" aria-selected={idx === highlight}>
              <button
                type="button"
                onMouseEnter={() => setHighlight(idx)}
                onClick={() => go(t)}
                className={[
                  "flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  idx === highlight ? "bg-ink-100" : "hover:bg-ink-50",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md",
                    idx === highlight
                      ? "bg-brand-600 text-white"
                      : "bg-ink-100 text-ink-700",
                  ].join(" ")}
                >
                  <Icon name={t.icon} size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-ink-900">
                    {t.name}
                  </span>
                  <span className="block truncate text-xs text-ink-500">
                    {t.shortDescription}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && q.trim() && results.length === 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-xl border border-ink-200 bg-white p-4 text-sm text-ink-500 shadow-lg">
          No tools match “{q}”.
        </div>
      )}
    </div>
  );
}
