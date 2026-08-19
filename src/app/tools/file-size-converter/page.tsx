import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { FileSizeConverter } from "@/components/tools/FileSizeConverter";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "file-size-converter";
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
    question: "What is the difference between KB and KiB?",
    answer: (
      <>
        A <strong>KB</strong> (kilobyte) is 1,000 bytes — the decimal
        definition used by storage vendors and most software. A{" "}
        <strong>KiB</strong> (kibibyte) is 1,024 bytes — the binary
        definition used by some operating systems and memory specifications.
        The same pattern applies to MB/MiB, GB/GiB and TB/TiB.
      </>
    ),
  },
  {
    question: "Why does my 1 TB drive show 931 GB in Windows?",
    answer: (
      <>
        Storage manufacturers advertise capacity in decimal (TB = 1,000 GB),
        while many operating systems historically reported binary sizes
        (TiB = 1,024 GiB). A &ldquo;1 TB&rdquo; drive has 1,000,000,000,000
        bytes, which is about 931 GiB.
      </>
    ),
  },
  {
    question: "Which system should I use?",
    answer: (
      <>
        Use <strong>decimal</strong> (KB, MB, GB, TB) for storage capacity,
        file sizes on disk and most software. Use <strong>binary</strong>{" "}
        (KiB, MiB, GiB, TiB) for memory and anywhere precise powers of 1,024
        matter.
      </>
    ),
  },
  {
    question: "How many bytes in a megabyte?",
    answer: (
      <>
        It depends on the definition. 1 MB = 1,000,000 bytes (decimal). 1
        MiB = 1,048,576 bytes (binary). The difference is about 4.86%.
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
              File sizes can be expressed in two systems: the decimal system
              (used by storage vendors) and the binary system (used by some
              operating systems and memory specifications).
            </p>
            <h3>Decimal (SI)</h3>
            <ul>
              <li>1 KB = 1,000 B</li>
              <li>1 MB = 1,000 KB = 1,000,000 B</li>
              <li>1 GB = 1,000 MB = 1,000,000,000 B</li>
              <li>1 TB = 1,000 GB = 1,000,000,000,000 B</li>
            </ul>
            <h3>Binary (IEC)</h3>
            <ul>
              <li>1 KiB = 1,024 B</li>
              <li>1 MiB = 1,024 KiB = 1,048,576 B</li>
              <li>1 GiB = 1,024 MiB = 1,073,741,824 B</li>
              <li>1 TiB = 1,024 GiB = 1,099,511,627,776 B</li>
            </ul>
            <p>
              The converter accepts either system as input and shows the
              equivalent in every other unit.
            </p>
          </>
        }
        examples={
          <>
            <p>Quick reference (decimal):</p>
            <ul>
              <li>1 KB = 1,000 B</li>
              <li>1 MB = 1,000 KB</li>
              <li>1 GB = 1,000 MB = 1,000,000 KB</li>
              <li>1 TB = 1,000 GB</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <FileSizeConverter />
      </ToolLayout>
    </>
  );
}
