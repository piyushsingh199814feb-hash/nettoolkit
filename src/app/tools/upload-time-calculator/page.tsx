import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { TransferTimeCalculator } from "@/components/tools/TransferTimeCalculator";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  SITE_NAME,
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "upload-time-calculator";
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
    question: "Why are upload speeds usually much lower than download?",
    answer: (
      <>
        Most residential internet connections are <em>asymmetric</em>: ISPs
        prioritise download bandwidth because most home usage (streaming,
        browsing, downloads) is downstream-heavy. Common ratios are 10:1 or
        20:1 (download:upload). Fiber and many business plans offer symmetric
        speeds.
      </>
    ),
  },
  {
    question: "How long to upload 1GB?",
    answer: (
      <>
        At a 10 Mbps upload speed, 1GB takes about 13 minutes 39 seconds. At
        50 Mbps, about 2 minutes 44 seconds. At 100 Mbps, about 1 minute 22
        seconds. Real-world upload times are usually 10–30% longer than the
        theoretical estimate.
      </>
    ),
  },
  {
    question: "How do I measure my actual upload speed?",
    answer: (
      <>
        Many speed test sites (such as the major broadband speed tests) report
        both download and upload speeds. Use the upload figure from such a
        test as the input speed in this calculator for the most realistic
        estimate.
      </>
    ),
  },
  {
    question: "Are my files uploaded?",
    answer: (
      <>
        No. The {SITE_NAME} upload time calculator runs entirely in your
        browser. The size you enter is used only for the math; nothing is
        transmitted.
      </>
    ),
  },
  {
    question: "How long to upload a 1 GB file on a typical home connection?",
    answer: (
      <>
        On a 10 Mbps upload (typical cable) about 13 minutes 39 seconds. On 50
        Mbps upload (faster cable or entry fiber) about 2 minutes 44 seconds.
        On gigabit upload (symmetric fiber) about 8 seconds.
      </>
    ),
  },
  {
    question: "How can I speed up my uploads?",
    answer: (
      <>
        Use a wired Ethernet connection instead of Wi-Fi. Close other apps
        using the network. Upload during off-peak hours (late night). Compress
        large files before uploading (especially videos and images). On
        residential broadband, upload speed is usually 5–10× slower than
        download, so plan accordingly.
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
              The {tool.name} estimates how long it will take to{" "}
              <strong>upload a file</strong> given its size and your
              connection&apos;s upload speed. The math is identical to the
              download case — the difference is that upload speeds on
              residential broadband are typically much lower than download
              speeds.
            </p>
            <h3>The formula</h3>
            <p>
              <code>time (s) = file size (bytes) ÷ (upload speed (Mbps) × 1,000,000 ÷ 8)</code>
            </p>
          </>
        }
        examples={
          <>
            <p>Approximate upload times for a 1 GB file:</p>
            <ul>
              <li>5 Mbps → about 27 minutes 18 seconds</li>
              <li>20 Mbps → about 6 minutes 50 seconds</li>
              <li>100 Mbps → about 1 minute 22 seconds</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <TransferTimeCalculator verb="upload" defaults={{ size: 200, sizeUnit: "MB", speed: 10, speedUnit: "Mbps" }} />
      </ToolLayout>
    </>
  );
}
