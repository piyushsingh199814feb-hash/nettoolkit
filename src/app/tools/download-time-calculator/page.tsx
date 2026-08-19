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

const SLUG = "download-time-calculator";
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
    question: "How long does it take to download 1GB?",
    answer: (
      <>
        On a 10 Mbps connection it takes about 13 minutes 39 seconds; on 50
        Mbps it is roughly 2 minutes 44 seconds; on 100 Mbps about 1 minute
        22 seconds; and on a 1 Gbps fiber link around 8 seconds. The exact time
        depends on the protocol overhead and the real throughput you get.
      </>
    ),
  },
  {
    question: "How long does it take to download 10GB?",
    answer: (
      <>
        A 10GB download at 100 Mbps takes about 13 minutes 39 seconds. At 25
        Mbps, expect roughly 54 minutes 36 seconds. Over a typical 4G mobile
        link (around 30 Mbps) it takes about 44 minutes 34 seconds.
      </>
    ),
  },
  {
    question: "What is the difference between Mbps and MB/s?",
    answer: (
      <>
        Mbps stands for megabits per second, while MB/s stands for megabytes
        per second. There are 8 megabits in a megabyte, so to convert from
        Mbps to MB/s you divide by 8. For example, a 100 Mbps connection
        delivers a maximum of 12.5 MB/s in real terms. Most download tools and
        browsers display speeds in MB/s, while internet plans are advertised
        in Mbps.
      </>
    ),
  },
  {
    question: "Why is my actual download slower than the estimated time?",
    answer: (
      <>
        The calculator uses a theoretical maximum based on the speed you
        enter. In practice, real download speeds are usually lower because of
        protocol overhead (TCP/IP, encryption), network congestion, Wi-Fi
        signal quality, server load, and the distance between you and the
        download server. A reasonable rule of thumb is to expect 70–90% of
        your advertised speed in good conditions.
      </>
    ),
  },
  {
    question: "Are my files uploaded to a server?",
    answer: (
      <>
        No. The {SITE_NAME} download time calculator runs entirely in your
        browser. The file size you enter is used only for the math and is
        never sent to a server.
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
              The {tool.name} estimates the time required to{" "}
              <strong>download a file</strong> based on two inputs: the size of
              the file and the speed of your internet connection. The result is
              the theoretical transfer time at full link speed, in plain
              human-readable units.
            </p>
            <h3>The formula</h3>
            <p>
              The calculation converts your file size to bytes and your speed
              to bytes per second, then divides one by the other:
            </p>
            <p>
              <code>time (s) = file size (bytes) ÷ (speed (Mbps) × 1,000,000 ÷ 8)</code>
            </p>
            <p>
              Because 1 byte = 8 bits, every megabit per second of bandwidth
              delivers 0.125 megabytes per second of throughput. A 100 Mbps
              connection can therefore transfer at most 12.5 MB/s.
            </p>
            <h3>Why real downloads are slower</h3>
            <p>
              The number you get is the theoretical minimum. Real-world
              download speeds are lower due to TCP/IP overhead, encryption
              (TLS), server bottlenecks, Wi-Fi quality and other factors.
              Expect around 70–90% of your advertised speed in good
              conditions, and much less on a busy network.
            </p>
          </>
        }
        examples={
          <>
            <p>Common download times for a 1 GB file:</p>
            <ul>
              <li>10 Mbps → about 13 minutes 39 seconds</li>
              <li>50 Mbps → about 2 minutes 44 seconds</li>
              <li>100 Mbps → about 1 minute 22 seconds</li>
              <li>500 Mbps → about 16 seconds</li>
              <li>1 Gbps (fiber) → about 8 seconds</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <TransferTimeCalculator verb="download" defaults={{ size: 500, sizeUnit: "MB", speed: 50, speedUnit: "Mbps" }} />
      </ToolLayout>
    </>
  );
}
