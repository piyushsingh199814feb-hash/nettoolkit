import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { ImageResizer } from "@/components/tools/ImageResizer";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "image-resizer";
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
    question: "Are my images uploaded?",
    answer: (
      <>
        No. The image resizer uses the HTML5 Canvas API in your browser. The
        image never leaves your device.
      </>
    ),
  },
  {
    question: "Will resizing reduce image quality?",
    answer: (
      <>
        Resizing to a smaller size is generally fine, but upscaling (making
        an image larger than the original) usually produces a soft or
        blurry result. The tool uses high-quality smoothing, but it cannot
        recover detail that isn&apos;t there.
      </>
    ),
  },
  {
    question: "What formats are supported?",
    answer: (
      <>
        Input: any browser-supported image format (JPG, PNG, WebP, GIF,
        BMP). Output: JPG, PNG or WebP.
      </>
    ),
  },
  {
    question: "What does locking the aspect ratio do?",
    answer: (
      <>
        When enabled, changing the width automatically updates the height
        (and vice versa) so the image keeps the same proportions. If you
        uncheck it, you can set the dimensions independently — useful for
        social-media crops.
      </>
    ),
  },
  {
    question: "Will the resized PNG keep transparency?",
    answer: (
      <>
        Yes, as long as you keep the output format as PNG or WebP. JPG does
        not support transparency — transparent areas become black.
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
              The resizer draws your image onto an HTML5 canvas at the new
              dimensions, then exports the canvas to your chosen format. The
              aspect-ratio lock keeps proportions in sync.
            </p>
            <ul>
              <li>Resizing down is fast and visually lossless for moderate reductions.</li>
              <li>Output as PNG to keep transparency.</li>
              <li>Output as JPG for the smallest files when transparency is not needed.</li>
            </ul>
          </>
        }
        examples={
          <>
            <p>Common targets:</p>
            <ul>
              <li>Instagram post: 1080×1080 (1:1)</li>
              <li>Twitter/X header: 1500×500 (3:1)</li>
              <li>YouTube thumbnail: 1280×720 (16:9)</li>
              <li>Web hero image: 1920×1080 (16:9)</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <ImageResizer />
      </ToolLayout>
    </>
  );
}
