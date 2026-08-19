import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { TransferTimeCalculator } from "@/components/tools/TransferTimeCalculator";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "file-transfer-time-calculator";
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
    question: "What speeds can I expect from USB?",
    answer: (
      <>
        USB 2.0: up to 480 Mbps (≈ 60 MB/s theoretical, ≈ 30 MB/s real).
        USB 3.0: up to 5 Gbps (≈ 625 MB/s theoretical, ≈ 300–400 MB/s
        real). USB 3.1 Gen 2: up to 10 Gbps. USB 3.2 Gen 2x2: up to 20 Gbps.
        Thunderbolt 3/4: up to 40 Gbps.
      </>
    ),
  },
  {
    question: "How fast is a typical LAN?",
    answer: (
      <>
        Fast Ethernet: 100 Mbps. Gigabit Ethernet: 1 Gbps (≈ 125 MB/s). 2.5
        GbE, 5 GbE, 10 GbE and beyond are increasingly common in homes and
        offices.
      </>
    ),
  },
  {
    question: "What is a reasonable estimate for an external SSD?",
    answer: (
      <>
        A modern external SSD over USB 3.0/3.1 typically delivers 300–500
        MB/s in practice. A portable NVMe enclosure over USB 3.2 Gen 2 can
        reach 800–1,000 MB/s. Spinning external HDDs are limited to about
        100–200 MB/s by the drive itself.
      </>
    ),
  },
  {
    question: "Are my files uploaded?",
    answer: (
      <>
        No. The calculator runs entirely in your browser. The size and speed
        values you enter are used only for the math and are not transmitted.
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
              The {tool.name} works the same way as the download time
              calculator, but is intended for any kind of file transfer — not
              just internet downloads.
            </p>
            <p>
              Typical use cases: estimating the time to copy a file over a
              LAN, time to back up to an external drive, or time to move data
              over a Wi-Fi link. The math is identical: divide the file size
              by the throughput in bytes per second.
            </p>
            <h3>Common transfer speeds</h3>
            <ul>
              <li>USB 2.0: ≈ 30 MB/s real</li>
              <li>USB 3.0: ≈ 300 MB/s real</li>
              <li>USB 3.1 / 3.2 Gen 2: ≈ 800 MB/s real</li>
              <li>Thunderbolt 3/4: up to 2,500 MB/s real</li>
              <li>Gigabit Ethernet: ≈ 110 MB/s real</li>
              <li>Wi-Fi 5 (802.11ac): ≈ 30–80 MB/s real</li>
              <li>Wi-Fi 6 (802.11ax): ≈ 80–200 MB/s real</li>
            </ul>
          </>
        }
        examples={
          <>
            <p>Time to transfer a 10 GB file:</p>
            <ul>
              <li>USB 2.0 (30 MB/s): about 5 minutes 41 seconds</li>
              <li>USB 3.0 (300 MB/s): about 34 seconds</li>
              <li>Gigabit Ethernet (110 MB/s): about 1 minute 33 seconds</li>
              <li>Wi-Fi 5 (50 MB/s): about 3 minutes 25 seconds</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <TransferTimeCalculator
          verb="transfer"
          defaults={{ size: 10, sizeUnit: "GB", speed: 300, speedUnit: "Mbps" }}
        />
      </ToolLayout>
    </>
  );
}
