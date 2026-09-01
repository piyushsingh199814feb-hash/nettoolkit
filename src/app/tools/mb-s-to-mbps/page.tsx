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

const SLUG = "mb-s-to-mbps";
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
    question: "What is the formula to convert MB/s to Mbps?",
    answer: (
      <>
        Multiply the number of megabytes per second by 8. Because 1 byte = 8
        bits, <code>Mbps = MB/s × 8</code>. For example, 12.5 MB/s = 100
        Mbps.
      </>
    ),
  },
  {
    question: "Why does my downloader show 12.5 MB/s on a 100 Mbps plan?",
    answer: (
      <>
        Because download managers report throughput in megabytes per second,
        while your ISP plan is sold in megabits per second. They are the same
        speed, just expressed in different units. 12.5 MB/s × 8 = 100 Mbps.
      </>
    ),
  },
  {
    question: "Is this the same as the Mbps to MB/s converter in reverse?",
    answer: (
      <>
        Yes. The two converters are inverses of each other. Enter any value in
        one to see the equivalent in the other.
      </>
    ),
  },
  {
    question: "How does this relate to my internet speed?",
    answer: (
      <>
        Internet service providers advertise plans in Mbps (megabits per
        second). To compare what you actually see in your download manager
        (MB/s) with your plan speed, multiply by 8.
      </>
    ),
  },
  {
    question: "Why is 100 MB/s not the same as 100 Mbps?",
    answer: (
      <>
        The capital B in MB/s means megabytes, while the lowercase b in Mbps
        means megabits. There are 8 bits in a byte, so 100 MB/s = 800 Mbps.
        The two units are 8× different and frequently confused.
      </>
    ),
  },
  {
    question: "How many Mbps do I need to stream 4K?",
    answer: (
      <>
        About 25 Mbps for a single 4K stream. So if you see 3.125 MB/s in your
        downloader, you are streaming 4K. Most home plans (100–300 Mbps)
        easily support 4K streaming on multiple devices.
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
              To convert megabytes per second to megabits per second, multiply
              by 8, because each byte contains 8 bits.
            </p>
            <h3>The formula</h3>
            <p>
              <code>Mbps = MB/s × 8</code>
            </p>
            <p>
              For KB/s, multiply by 8 to get Kbps, then divide by 1,000 to
              get Mbps. For GB/s, multiply by 8,000 to get Mbps.
            </p>
          </>
        }
        examples={
          <>
            <p>Common conversions:</p>
            <ul>
              <li>1.25 MB/s = 10 Mbps</li>
              <li>6.25 MB/s = 50 Mbps</li>
              <li>12.5 MB/s = 100 Mbps</li>
              <li>62.5 MB/s = 500 Mbps</li>
              <li>125 MB/s = 1,000 Mbps (1 Gbps)</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <Converter
          kind="mb-s-to-mbps"
          defaultValue="12.5"
          defaultUnit="MB/s"
          presets={[1.25, 6.25, 12.5, 62.5, 125]}
        />
      </ToolLayout>
    </>
  );
}
