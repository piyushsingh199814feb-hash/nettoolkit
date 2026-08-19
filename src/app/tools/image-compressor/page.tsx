import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { ImageCompressor } from "@/components/tools/ImageCompressor";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "image-compressor";
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
    question: "Are my images uploaded to a server?",
    answer: (
      <>
        No. Image compression runs entirely in your browser using the HTML5
        Canvas API. Images never leave your device. You can verify this by
        opening the tool while offline.
      </>
    ),
  },
  {
    question: "What image formats are supported?",
    answer: (
      <>
        JPG, PNG and WebP can be both the input and the output. For best
        compression, convert PNGs to JPG or WebP. PNGs are lossless by
        design, so converting to JPG with a quality of 70–80% usually
        produces a much smaller file.
      </>
    ),
  },
  {
    question: "What quality should I use?",
    answer: (
      <>
        70–80% is a good starting point for JPG and WebP. Below 60% you may
        start to see compression artifacts in photos; above 90% the savings
        are usually small. Try a few values and compare the result.
      </>
    ),
  },
  {
    question: "Will the compressed image keep the same dimensions?",
    answer: (
      <>
        By default, yes. Set a value in the &ldquo;Max width&rdquo; field to
        also downscale images that exceed that width. The aspect ratio is
        preserved.
      </>
    ),
  },
  {
    question: "Is there a file size limit?",
    answer: (
      <>
        The browser limit is your device&apos;s available memory. The tool
        enforces a 50MB per-file limit by default. Very large images (over
        about 20 megapixels) may be slow on older devices.
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
              The image compressor uses your browser&apos;s built-in{" "}
              <code>canvas.toBlob</code> API to re-encode images at the
              quality and format you choose. The original image is decoded
              into a canvas, then exported to a new file.
            </p>
            <ul>
              <li>JPG and WebP are lossy — smaller files, slight quality loss.</li>
              <li>PNG is lossless — preserves every pixel but produces bigger files.</li>
              <li>
                Optional max-width downscales images that are too large while
                keeping the aspect ratio.
              </li>
            </ul>
            <p>
              All processing happens locally — your images are never
              uploaded.
            </p>
          </>
        }
        examples={
          <>
            <p>Common starting points:</p>
            <ul>
              <li>Photos for the web: JPG, quality 75%</li>
              <li>Maximum savings: WebP, quality 70%</li>
              <li>Transparent images: PNG, no quality slider</li>
              <li>Email attachments: JPG, max width 1600px, quality 80%</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <ImageCompressor />
      </ToolLayout>
    </>
  );
}
