import type { Metadata } from "next";
import { ToolLayout } from "@/components/ToolLayout";
import { BandwidthCalculator } from "@/components/tools/BandwidthCalculator";
import { getTool, getRelatedTools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  pageUrl,
  softwareAppJsonLd,
  toolUrl,
} from "@/lib/site";

const SLUG = "bandwidth-calculator";
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
    question: "What is bandwidth?",
    answer: (
      <>
        Bandwidth is the maximum rate at which data can be transferred over a
        network connection, usually measured in bits per second (Mbps, Gbps).
        Higher bandwidth lets more data move per second.
      </>
    ),
  },
  {
    question: "How is required bandwidth calculated?",
    answer: (
      <>
        Required bandwidth ≈ (number of users × data per user) ÷ time
        window. This assumes all users are active simultaneously and is a
        theoretical minimum. Real-world networks need headroom for peaks and
        bursts — multiply the result by 1.5 to 2 for planning.
      </>
    ),
  },
  {
    question: "How much bandwidth do I need for 50 users?",
    answer: (
      <>
        A reasonable starting point is 5 Mbps per user for general office
        work (browsing, email, video calls). For 50 concurrent users that is
        about 250 Mbps. For 1080p video streaming, plan closer to 5–8 Mbps
        per user; for 4K, 25 Mbps per user.
      </>
    ),
  },
  {
    question: "Is this calculator suitable for server capacity planning?",
    answer: (
      <>
        It is a useful first-pass estimate for link sizing and budgeting, but
        production networks should add headroom for protocol overhead, peaks,
        failover and growth. Always validate with real measurements from your
        own monitoring before finalising capacity.
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
              The bandwidth calculator turns three numbers — the number of
              users, the data each user consumes, and the time window — into
              a single bandwidth requirement.
            </p>
            <h3>The formula</h3>
            <p>
              <code>bandwidth (bps) = users × data per user (bits) ÷ time
              window (seconds)</code>
            </p>
            <p>
              For example, 50 users consuming 5 MB per minute each need about
              33.3 Mbps. This is a baseline; real networks should leave
              headroom for peaks and protocol overhead.
            </p>
          </>
        }
        examples={
          <>
            <p>Worked examples:</p>
            <ul>
              <li>10 users × 2 MB/min → 2.67 Mbps</li>
              <li>100 users × 10 MB/hour → 2.22 Mbps</li>
              <li>500 users × 5 MB/hour → 5.56 Mbps</li>
            </ul>
          </>
        }
        faqs={FAQS}
      >
        <BandwidthCalculator />
      </ToolLayout>
    </>
  );
}
