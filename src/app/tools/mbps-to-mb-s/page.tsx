import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { Converter } from "@/components/tools/Converter";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "mbps-to-mb-s";
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
    question: "What is the formula to convert Mbps to MB/s?",
    answer: (
      <>
        Divide the number of megabits per second by 8. Because 1 byte = 8
        bits, <code>MB/s = Mbps ÷ 8</code>. For example, 100 Mbps = 12.5
        MB/s.
      </>
    ),
  },
  {
    question: "Why does my 100 Mbps plan show 12.5 MB/s in my downloader?",
    answer: (
      <>
        Because the plan is sold in megabits per second, while most download
        managers report megabytes per second. They are different units: 1
        byte = 8 bits. 100 Mbps = 12.5 MB/s, so a 12.5 MB/s reading in your
        downloader means you are getting exactly the plan&apos;s full speed.
      </>
    ),
  },
  {
    question: "Is Mbps the same as Mb/s?",
    answer: (
      <>
        They are commonly used interchangeably. Both stand for megabits per
        second. Note the lowercase &ldquo;b&rdquo; in Mbps and Mb/s — that
        indicates bits, not bytes (which would be MB or MB/s, capital B).
      </>
    ),
  },
  {
    question: "Should I use the decimal or binary definition?",
    answer: (
      <>
        Network speeds always use the decimal definition (1 Mbps = 1,000,000
        bits per second). File sizes often use the binary definition (1 MiB =
        1,048,576 bytes), but data rates do not. This converter uses the
        decimal definition.
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
              Megabits per second (Mbps) and megabytes per second (MB/s) are
              both data-rate units, but they measure different things. A{" "}
              <strong>bit</strong> is 1/8 of a <strong>byte</strong>, so a
              100 Mbps connection delivers a maximum of 12.5 MB/s in real
              terms.
            </p>
            <h3>The formula</h3>
            <p>
              <code>MB/s = Mbps ÷ 8</code>
            </p>
            <p>
              For Kbps, first convert to Mbps (÷1,000) or directly to MB/s
              (÷8,000). For Gbps, multiply by 1,000 first, then divide by 8.
            </p>
          </>
        }
        examples={
          <>
            <p>Common conversions:</p>
            <ul>
              <li>10 Mbps = 1.25 MB/s</li>
              <li>50 Mbps = 6.25 MB/s</li>
              <li>100 Mbps = 12.5 MB/s</li>
              <li>500 Mbps = 62.5 MB/s</li>
              <li>1 Gbps = 125 MB/s</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <Converter
          kind="mbps-to-mb-s"
          defaultValue="100"
          defaultUnit="Mbps"
          presets={[10, 25, 50, 100, 200, 500, 1000]}
        />
      </ToolLayout>
    </>
  );
}
