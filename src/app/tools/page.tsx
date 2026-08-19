import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ToolCard } from "@/components/ToolCard";
import { SearchTools } from "@/components/SearchTools";
import { ToolsBrowser } from "./_components/ToolsBrowser";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/categories";
import { SITE_NAME, pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `All Tools — ${SITE_NAME}`,
  description:
    "Browse the complete list of free online tools: download time calculator, image compressor, file size converter, and more.",
  alternates: { canonical: pageUrl("/tools") },
};

export default function ToolsPage() {
  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "All tools" },
        ]}
      />
      <header className="mt-4">
        <h1 className="h-tool">All tools</h1>
        <p className="mt-2 max-w-2xl text-base text-ink-600">
          {TOOLS.length} free online tools across {CATEGORIES.length} categories.
          Search, filter or browse — every tool works without an account.
        </p>
      </header>

      <div className="mt-6">
        <SearchTools
          placeholder="Search the directory…"
          className="max-w-xl"
        />
      </div>

      <ToolsBrowser />
    </div>
  );
}
