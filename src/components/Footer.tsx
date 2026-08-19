import Link from "next/link";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink-200 bg-ink-50">
      <div className="container-narrow py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-ink-900">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"
                aria-hidden
              >
                <Icon name="zap" size={18} strokeWidth={2} />
              </span>
              <span className="text-base">NetToolKit</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-ink-600">
              Simple tools for the internet, files, and everyday digital tasks.
              Fast, free and privacy-friendly.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Tools</h3>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>
                <Link className="hover:text-ink-900" href="/tools">
                  All tools
                </Link>
              </li>
              <li>
                <Link className="hover:text-ink-900" href="/category/internet">
                  Internet tools
                </Link>
              </li>
              <li>
                <Link className="hover:text-ink-900" href="/category/file">
                  File tools
                </Link>
              </li>
              <li>
                <Link className="hover:text-ink-900" href="/category/converters">
                  Converters
                </Link>
              </li>
              <li>
                <Link className="hover:text-ink-900" href="/category/calculators">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-ink-900">Company</h3>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>
                <Link className="hover:text-ink-900" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-ink-900" href="/privacy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-ink-900" href="/terms">
                  Terms of service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} NetToolKit. All rights reserved.</p>
          <p>
            Files are processed locally in your browser whenever possible.
          </p>
        </div>
      </div>
    </footer>
  );
}
