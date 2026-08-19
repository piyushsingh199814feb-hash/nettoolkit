import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, idx) => {
          const last = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="rounded px-1 hover:text-ink-800 hover:underline"
                >
                  {c.label}
                </Link>
              ) : (
                <span className="px-1 text-ink-700" aria-current={last ? "page" : undefined}>
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="text-ink-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
