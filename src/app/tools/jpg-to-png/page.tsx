import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { ImageFormatConverter } from "@/components/tools/ImageFormatConverter";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "jpg-to-png";
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
        No. The conversion happens in your browser using the HTML5 Canvas
        API. The image never leaves your device.
      </>
    ),
  },
  {
    question: "Will the PNG be larger than the JPG?",
    answer: (
      <>
        Almost always yes. JPG is a lossy format designed for photos; PNG is
        lossless. For photographic images, expect the PNG to be several
        times larger. The benefit of PNG is lossless quality and optional
        transparency.
      </>
    ),
  },
  {
    question: "Will transparency be preserved?",
    answer: (
      <>
        JPG does not support transparency, so there is no transparency to
        preserve. The PNG will be fully opaque. If you need transparency,
        you already have it — keep the original PNG instead.
      </>
    ),
  },
  {
    question: "Why convert JPG to PNG?",
    answer: (
      <>
        Common reasons: making a logo lossless for further editing, removing
        JPG artifacts before more processing, or producing a file that
        supports an alpha channel for downstream tools.
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
              The converter decodes your JPG, draws it onto an HTML5 canvas,
              then re-encodes the canvas as PNG. PNG is lossless, so the
              visual quality is identical to the source — but the file will
              be larger.
            </p>
          </>
        }
        examples={
          <ul>
            <li>A 1 MB JPG of a landscape usually becomes 4–8 MB as PNG.</li>
            <li>A JPG logo with a solid background converts cleanly to PNG.</li>
            <li>Use PNG only if you need lossless quality or transparency downstream.</li>
          </ul>
        }
        faqs={FAQS}
      >
        <ImageFormatConverter
          direction="jpg-to-png"
          accept="image/jpeg,image/jpg,.jpg,.jpeg"
          outputType="image/png"
          resultTitle="PNG output"
          pickerHint="JPG / JPEG files only — processed in your browser."
        />
      </ToolLayout>
    </>
  );
}
