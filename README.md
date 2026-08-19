# NetToolKit

A free, fast, privacy-friendly online toolkit for the internet, files, and everyday digital tasks.

NetToolKit is built with Next.js 14, TypeScript and Tailwind CSS, fully statically exported for deployment on Cloudflare Pages or any modern static host. All file tools (image compression, format conversion, resizing) run entirely in the browser — nothing is uploaded to a server.

## Tech stack

- **Next.js 14** (App Router, static export)
- **TypeScript** (strict)
- **Tailwind CSS** (utility-first)
- **React 18** (client + server components)
- Zero backend; fully static

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
```

The build output (`./out/`) is a fully self-contained static site you can drop onto Cloudflare Pages, Netlify, GitHub Pages, or any static host.

## Project structure

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Home
│   ├── tools/
│   │   ├── page.tsx          # Tool directory
│   │   ├── download-time-calculator/page.tsx
│   │   ├── image-compressor/page.tsx
│   │   └── … (one folder per tool)
│   ├── category/[slug]/      # Category pages (SSG)
│   ├── about/                # About
│   ├── privacy/              # Privacy policy
│   ├── terms/                # Terms of service
│   ├── contact/              # Contact
│   ├── sitemap.ts            # Auto-generated sitemap
│   └── robots.ts             # Auto-generated robots.txt
├── components/
│   ├── Header.tsx, Footer.tsx, Breadcrumbs.tsx, …
│   ├── tools/                # One file per calculator/converter
│   └── ui/                   # Button, Input, Select, Alert primitives
├── lib/
│   ├── tools.ts              # Tool registry (single source of truth)
│   ├── categories.ts         # Category definitions
│   ├── units.ts              # Pure unit-conversion math
│   ├── format.ts             # Number/duration/byte formatting
│   ├── site.ts               # Site config + JSON-LD helpers
│   ├── types.ts              # Shared types
│   └── parametric.ts         # Programmatic SEO data (future use)
└── app/globals.css           # Tailwind + design tokens
```

## Adding a new tool

1. Create the calculator/component in `src/components/tools/MyTool.tsx` (mark it `"use client"` if it has state).
2. Add a metadata entry in `src/lib/tools.ts`:

```ts
{
  id: "my-tool",
  name: "My Tool",
  slug: "my-tool",
  category: "calculators",
  description: "What it does in 1–2 sentences.",
  shortDescription: "One-liner for cards.",
  icon: "calculator",
  keywords: ["my", "tool", "keywords"],
  relatedTools: ["download-time-calculator"],
  seoTitle: "My Tool — short SEO title",
  seoDescription: "Long SEO description with keywords.",
  popular: true,
},
```

3. Create a page: `src/app/tools/my-tool/page.tsx` that wraps your tool in the `<ToolLayout>` component (or roll your own if you need a custom layout).

That's it. The site header, footer, tool directory, search, breadcrumbs, related-tools and sitemap all pick it up automatically.

## SEO architecture

Every tool page exports:

- A unique `<title>` and `<meta name="description">` (with title template)
- Canonical URL
- Open Graph + Twitter Card metadata
- Three JSON-LD blocks: `WebApplication`, `BreadcrumbList`, `FAQPage`
- Semantic HTML with proper H1/H2/H3 hierarchy
- Breadcrumb navigation with `aria-label`

The site also generates `sitemap.xml` and `robots.txt` automatically from the tool registry.

## Programmatic SEO

`src/lib/parametric.ts` defines a data shape for generating thousands of long-tail pages (e.g. `/download-time/1gb-at-100mbps`). To activate, create a dynamic route under `src/app/download-time/[slug]/page.tsx` and use `downloadTimeParams()` as `generateStaticParams`. The structure is in place; pages are intentionally not yet generated to keep the launch clean.

## Privacy

- All file processing is client-side via HTML5 Canvas and the File API.
- No analytics, no cookies, no third-party trackers.
- The privacy policy (`/privacy`) explains exactly what is and isn't collected.

## Performance

- **First-load JS**: ~87 kB shared (gzipped ~30 kB)
- Each tool page adds 0.1–3.6 kB of additional JS
- All pages are statically pre-rendered
- No client-side route fetching; navigation is instant

## License

The source code is provided for evaluation. All rights reserved by the operator of NetToolKit.
