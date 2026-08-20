import type { ToolMeta } from "./types";

export const SITE_URL = "https://nettoolkit.xyz";
export const SITE_NAME = "NetToolKit";
export const SITE_TAGLINE =
  "Simple tools for the internet, files, and everyday digital tasks.";

export const DEFAULT_OG_IMAGE = "/og-default.png";

export function toolUrl(slug: string): string {
  return `${SITE_URL}/tools/${slug}`;
}

export function categoryUrl(slug: string): string {
  return `${SITE_URL}/category/${slug}`;
}

export function pageUrl(path: string): string {
  if (path.startsWith("/")) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${path}`;
}

export function softwareAppJsonLd(tool: ToolMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: toolUrl(tool.slug),
    description: tool.seoDescription,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    browserRequirements: "Modern web browser with JavaScript enabled",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqJsonLd(
  faqs: { question: string; answer: React.ReactNode }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: reactToText(f.answer),
      },
    })),
  };
}

/** Convert a ReactNode to a plain text string for structured data. */
function reactToText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(reactToText).join("");
  if (typeof node === "object" && "props" in node) {
    const el = node as { props: { children?: React.ReactNode } };
    return reactToText(el.props.children);
  }
  return "";
}
