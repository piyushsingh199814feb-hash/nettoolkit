import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_NAME, pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: `${SITE_NAME} privacy policy: what we collect, how files are processed, and your rights.`,
  alternates: { canonical: pageUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />
      <header className="mt-4">
        <h1 className="h-tool">Privacy policy</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      <article className="prose-body mt-8 max-w-none">
        <p>
          {SITE_NAME} is built around a simple privacy promise: your files
          and inputs stay on your device. This page explains exactly what
          data is collected, what is not, and why.
        </p>

        <h2>Summary</h2>
        <ul>
          <li>
            <strong>Files you process</strong> (images, etc.) are processed
            locally in your browser. They are never uploaded to our
            servers.
          </li>
          <li>
            <strong>Calculator inputs</strong> (file sizes, speeds, ratios)
            are used only for the math and never leave your device.
          </li>
          <li>
            <strong>Account data</strong> — we do not require an account.
            No usernames, no emails.
          </li>
          <li>
            <strong>Analytics</strong> — we may use privacy-friendly
            analytics that do not track you across sites. If we do, we will
            list them here and make it opt-in where required.
          </li>
          <li>
            <strong>Ads</strong> — we may show non-intrusive advertisements
            on some pages. They are provided by third-party ad networks
            (e.g. Google AdSense) and are governed by their own privacy
            practices.
          </li>
        </ul>

        <h2>1. Information we collect</h2>
        <p>
          We collect very little information. The categories below cover
          everything that may be collected.
        </p>
        <h3>a. Information you provide</h3>
        <p>
          The site does not require an account. You can use every tool
          without providing any personal information. If you contact us
          directly (for example by email), we receive whatever you choose
          to send.
        </p>
        <h3>b. Files you process</h3>
        <p>
          When you use a file tool (image compressor, image resizer, format
          converter, etc.) the file is loaded into your browser and
          processed locally. The file is not transferred to any server. The
          only data we may see is standard HTTP request metadata served by
          your browser when loading the page itself.
        </p>
        <h3>c. Analytics</h3>
        <p>
          We may use a privacy-friendly analytics service (such as a
          self-hosted or aggregate-only solution) to understand which tools
          are used and how the site is performing. These services do not
          record personally identifiable information and do not track you
          across other websites.
        </p>
        <h3>d. Cookies</h3>
        <p>
          The site does not require cookies to function. If we add
          third-party advertising, the ad network may set cookies or
          similar identifiers to deliver and measure ads. You can opt out of
          personalised advertising via your browser or via tools such as
          the Digital Advertising Alliance&apos;s opt-out.
        </p>

        <h2>2. How we use information</h2>
        <ul>
          <li>To operate and improve the site.</li>
          <li>To understand which tools are useful and which are not.</li>
          <li>To respond to direct inquiries from you.</li>
        </ul>

        <h2>3. File processing in detail</h2>
        <p>
          File tools run on the client side using the HTML5 Canvas API and
          the File API. No file data is sent over the network. The output
          file you download is generated entirely in your browser and
          delivered to you as a local blob URL.
        </p>

        <h2>4. Third-party services</h2>
        <p>
          We may use the following categories of third-party services. We
          will update this list whenever a service is added or removed.
        </p>
        <ul>
          <li>
            <strong>Hosting and CDN</strong> — to serve the website quickly
            and reliably.
          </li>
          <li>
            <strong>Analytics</strong> — privacy-friendly, aggregate-only
            usage analytics.
          </li>
          <li>
            <strong>Advertising</strong> — non-intrusive ads on some pages.
          </li>
        </ul>
        <p>
          These services may collect technical data (IP address, user
          agent, referrer) for their own purposes. They are governed by
          their own privacy policies.
        </p>

        <h2>5. Children&apos;s privacy</h2>
        <p>
          The site is not directed to children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>6. Your rights</h2>
        <p>
          Because we do not collect personal information in the normal
          course of using the site, there is generally nothing to access,
          correct or delete. If you have contacted us directly, you can ask
          us to delete that correspondence at any time.
        </p>

        <h2>7. Security</h2>
        <p>
          The site is served over HTTPS. Because file processing happens
          locally, there is no upload step to secure. We follow best
          practices for the parts of the site we operate.
        </p>

        <h2>8. International transfers</h2>
        <p>
          Because we do not collect personal information, this is largely
          not applicable. Any third-party services we use may process
          requests in countries other than your own.
        </p>

        <h2>9. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;Last
          updated&rdquo; date at the top of the page will reflect the most
          recent revision. Material changes will be highlighted on the
          homepage for a reasonable period.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have any questions about this privacy policy, please
          contact us via the email address listed on our contact page.
        </p>
      </article>
    </div>
  );
}
