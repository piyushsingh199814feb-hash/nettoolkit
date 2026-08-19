"use client";

import * as React from "react";
import { Icon } from "./Icon";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className="divide-y divide-ink-200 rounded-xl border border-ink-200 bg-white">
      {items.map((it, idx) => (
        <FaqEntry key={idx} item={it} />
      ))}
    </div>
  );
}

function FaqEntry({ item }: { item: FAQItem }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <h3 className="text-base font-medium text-ink-900">{item.question}</h3>
        <span
          className={[
            "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-600 transition-transform",
            open ? "rotate-45" : "",
          ].join(" ")}
          aria-hidden
        >
          <Icon name="close" size={14} />
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm leading-relaxed text-ink-700">
          {item.answer}
        </div>
      )}
    </div>
  );
}
