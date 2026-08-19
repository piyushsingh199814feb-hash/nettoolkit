import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { AspectRatioCalculator } from "@/components/tools/AspectRatioCalculator";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "aspect-ratio-calculator";
const tool = getTool(SLUG)!;
const related = getRelatedTools(SLUG);

export const metadata: Metadata = {
  title: tool.seoTitle,
  description: tool.seoDescription,
  alternates: { canonical: toolUrl(SLUG) },
  openGraph: {
    title: tool.seoTitle,
    description: tool.seoDescription,
    url: toolUrl(SLUG),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: tool.seoTitle,
    description: tool.seoDescription,
  },
};

const FAQS = [
  {
    question: "What is an aspect ratio?",
    answer: (
      <>
        An aspect ratio describes the proportional relationship between an
        image&apos;s width and its height. It is written as{" "}
        <code>width:height</code> (e.g. 16:9) and stays the same regardless
        of the actual pixel dimensions.
      </>
    ),
  },
  {
    question: "How do I calculate an aspect ratio from pixel dimensions?",
    answer: (
      <>
        Divide the width and height by their greatest common divisor (GCD).
        For example, 1920 × 1080 has a GCD of 120, so 1920/120 : 1080/120 =
        16:9.
      </>
    ),
  },
  {
    question: "What is 16:9 used for?",
    answer: (
      <>
        16:9 is the standard aspect ratio for HDTV, most online video,
        modern monitors, and YouTube. 1920×1080, 2560×1440 and 3840×2160
        (4K) are all 16:9.
      </>
    ),
  },
  {
    question: "What is 9:16 used for?",
    answer: (
      <>
        9:16 is the vertical version of 16:9. It is the standard for vertical
        video on TikTok, Instagram Reels, YouTube Shorts and similar
        platforms.
      </>
    ),
  },
  {
    question: "What is 21:9 used for?",
    answer: (
      <>
        21:9 is an ultrawide aspect ratio used by ultrawide monitors and
        some cinema content. It is wider than 16:9, giving more horizontal
        screen space.
      </>
    ),
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppJsonLd(tool)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: pageUrl("/") },
              { name: "Tools", url: pageUrl("/tools") },
              { name: tool.name, url: toolUrl(SLUG) },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(FAQS)),
        }}
      />
      <ToolLayout
        tool={tool}
        related={related}
        howItWorks={
          <>
            <p>
              An aspect ratio is a ratio of width to height. The calculator
              has three modes:
            </p>
            <ul>
              <li>
                <strong>From width &amp; height</strong>: enter any two
                dimensions and get the simplified ratio (e.g. 1920×1080 →
                16:9).
              </li>
              <li>
                <strong>From width &amp; ratio</strong>: enter a width and
                a target ratio to compute the matching height.
              </li>
              <li>
                <strong>From height &amp; ratio</strong>: enter a height and
                a target ratio to compute the matching width.
              </li>
            </ul>
            <h3>Common ratios</h3>
            <ul>
              <li>16:9 — HD video, modern monitors</li>
              <li>4:3 — classic TV and some compact cameras</li>
              <li>1:1 — square (Instagram, profile photos)</li>
              <li>9:16 — vertical video (TikTok, Reels, Shorts)</li>
              <li>3:2 — 35mm photography, many mirrorless cameras</li>
              <li>21:9 — ultrawide cinema and monitors</li>
            </ul>
          </>
        }
        examples={
          <>
            <p>Quick examples:</p>
            <ul>
              <li>1920×1080 → 16:9</li>
              <li>1080×1920 → 9:16</li>
              <li>4032×3024 → 4:3</li>
              <li>3000×2000 → 3:2</li>
              <li>3440×1440 → 43:18 (≈ 21.5:9)</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <AspectRatioCalculator />
      </ToolLayout>
    </>
  );
}
