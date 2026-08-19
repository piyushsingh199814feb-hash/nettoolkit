import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_NAME, SITE_TAGLINE, pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description: `About ${SITE_NAME}: a fast, free, privacy-friendly online toolkit for the internet, files and everyday digital tasks.`,
  alternates: { canonical: pageUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <header className="mt-4">
        <h1 className="h-tool">About {SITE_NAME}</h1>
        <p className="mt-2 max-w-2xl text-base text-ink-600">{SITE_TAGLINE}</p>
      </header>

      <article className="prose-body mt-8 max-w-none">
        <h2>What is {SITE_NAME}?</h2>
        <p>
          {SITE_NAME} is a free online toolkit that gathers together the
          small utilities people need every day: download time calculators,
          image compressors, format converters and more. The whole point is
          to make these tasks quick, accurate and respectful of your data.
        </p>

        <h2>What we believe</h2>
        <ul>
          <li>
            <strong>Tools should be free.</strong> No paywalls, no premium
            tiers for basic functionality.
          </li>
          <li>
            <strong>Tools should be fast.</strong> Pages should load
            instantly and calculations should happen in milliseconds.
          </li>
          <li>
            <strong>Tools should respect your privacy.</strong> Wherever
            technically possible, files are processed locally in your
            browser and never uploaded to a server.
          </li>
          <li>
            <strong>Tools should be honest.</strong> Real-world speeds are
            real-world speeds. We do not overstate the accuracy of our
            calculators and we clearly call out where results are
            theoretical.
          </li>
        </ul>

        <h2>How the site is built</h2>
        <p>
          {SITE_NAME} is a static web application built with modern web
          technologies. The codebase is intentionally lightweight: there are
          no heavy frontend frameworks, no client-side trackers, and no
          third-party scripts that are not strictly necessary for the tools
          to work.
        </p>
        <p>
          Image and file tools run entirely in your browser using standard
          web APIs (HTML5 Canvas, the File API, Web Workers where helpful).
          Calculators and converters are pure JavaScript with no network
          calls.
        </p>

        <h2>Adding new tools</h2>
        <p>
          The site is built around a small tool registry. Adding a new tool
          is a matter of writing the calculator or converter component and
          adding its metadata (name, description, category, SEO fields) to a
          single configuration file. Pages, navigation, search and related
          tool suggestions pick up new entries automatically.
        </p>

        <h2>Get in touch</h2>
        <p>
          We are always looking for new tools to add. If there is a tool
          you would find useful, or if you spot a bug, please reach out via
          our <Link href="/contact">contact page</Link> (coming soon) or open
          an issue on our public repository.
        </p>
      </article>
    </div>
  );
}
