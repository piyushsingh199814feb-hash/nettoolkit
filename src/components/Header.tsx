"use client";

import * as React from "react";
import Link from "next/link";
import { Icon } from "./Icon";
import { SearchTools } from "./SearchTools";

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="container-narrow flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-ink-900"
            aria-label="NetToolKit home"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"
              aria-hidden
            >
              <Icon name="zap" size={18} strokeWidth={2} />
            </span>
            <span className="text-base tracking-tight">NetToolKit</span>
          </Link>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            <NavLink href="/category/internet">Internet</NavLink>
            <NavLink href="/category/file">File</NavLink>
            <NavLink href="/category/converters">Converters</NavLink>
            <NavLink href="/category/calculators">Calculators</NavLink>
            <NavLink href="/tools">All tools</NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SearchTools compact />
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink-200 text-ink-700 hover:bg-ink-50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-200 bg-white md:hidden">
          <div className="container-narrow flex flex-col gap-1 py-3">
            <div className="px-1 pb-2 sm:hidden">
              <SearchTools compact autoFocus />
            </div>
            <MobileNavLink href="/category/internet" onClick={() => setOpen(false)}>
              Internet Tools
            </MobileNavLink>
            <MobileNavLink href="/category/file" onClick={() => setOpen(false)}>
              File Tools
            </MobileNavLink>
            <MobileNavLink
              href="/category/converters"
              onClick={() => setOpen(false)}
            >
              Converters
            </MobileNavLink>
            <MobileNavLink
              href="/category/calculators"
              onClick={() => setOpen(false)}
            >
              Calculators
            </MobileNavLink>
            <MobileNavLink href="/tools" onClick={() => setOpen(false)}>
              All tools
            </MobileNavLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-1.5 text-sm font-medium text-ink-700 hover:bg-ink-100 hover:text-ink-900"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-md px-3 py-2.5 text-base font-medium text-ink-800 hover:bg-ink-100"
    >
      {children}
    </Link>
  );
}
