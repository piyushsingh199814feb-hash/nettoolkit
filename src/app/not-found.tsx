import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function NotFound() {
  return (
    <div className="container-narrow py-16">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Not found" }]} />
      <div className="mt-6 max-w-xl">
        <h1 className="h-tool">Page not found</h1>
        <p className="mt-3 text-ink-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Try one of the popular tools below.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            Go home
          </Link>
          <Link
            href="/tools"
            className="rounded-lg border border-ink-300 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50"
          >
            All tools
          </Link>
        </div>
      </div>
    </div>
  );
}
