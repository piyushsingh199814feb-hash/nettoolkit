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

const SLUG = "png-to-jpg";
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
        No. Conversion happens entirely in your browser using the HTML5
        Canvas API. Your images are not sent anywhere.
      </>
    ),
  },
  {
    question: "What happens to transparency?",
    answer: (
      <>
        JPG does not support transparency. Transparent areas are filled
        with a white background. If you need to keep transparency, stay with
        PNG or WebP.
      </>
    ),
  },
  {
    question: "Will the JPG be smaller than the PNG?",
    answer: (
      <>
        Usually, yes — significantly. JPG is a lossy format optimised for
        photos. A 5 MB PNG photo often becomes a 500 KB–1 MB JPG at default
        quality. The result depends on the image content and the chosen
        quality.
      </>
    ),
  },
  {
    question: "Is there a quality loss?",
    answer: (
      <>
        Yes. JPG is lossy. The default quality of 92% is visually
        indistinguishable from the source for most photos. Lowering quality
        produces smaller files but introduces compression artifacts.
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
              The converter decodes your PNG, draws it onto an HTML5 canvas
              (with a white background to replace transparency), then
              re-encodes the canvas as JPG at a fixed quality. JPG is much
              smaller for photos but is lossy.
            </p>
          </>
        }
        examples={
          <ul>
            <li>A 5 MB PNG photo often becomes ~500 KB to 1 MB JPG.</li>
            <li>Use this when you need a small file for email or web upload.</li>
            <li>For lossless output or transparency, use the PNG output of the JPG → PNG tool instead.</li>
          </ul>
        }
        faqs={FAQS}
      >
        <ImageFormatConverter
          direction="png-to-jpg"
          accept="image/png,.png"
          outputType="image/jpeg"
          quality={0.92}
          resultTitle="JPG output"
          pickerHint="PNG files only — processed in your browser."
        />
      </ToolLayout>
    </>
  );
}
