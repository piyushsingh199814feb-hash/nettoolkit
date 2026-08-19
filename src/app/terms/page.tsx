import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SITE_NAME, pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms of Service — ${SITE_NAME}`,
  description: `${SITE_NAME} terms of service: rules for using the site and the tools.`,
  alternates: { canonical: pageUrl("/terms") },
};

export default function TermsPage() {
  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Terms of service" }]}
      />
      <header className="mt-4">
        <h1 className="h-tool">Terms of service</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      <article className="prose-body mt-8 max-w-none">
        <p>
          By using {SITE_NAME} you agree to the following terms. If you do
          not agree, please do not use the site.
        </p>

        <h2>1. The service</h2>
        <p>
          {SITE_NAME} provides free online tools, calculators and
          converters. File-processing tools run in your browser. We may add
          or remove tools at any time without notice.
        </p>

        <h2>2. No warranty</h2>
        <p>
          The tools are provided &ldquo;as is&rdquo;, without warranty of
          any kind. While we aim for accuracy, we do not guarantee that any
          result is correct or suitable for a particular purpose. Use the
          tools at your own discretion. Calculator results are theoretical
          estimates; real-world performance may differ.
        </p>

        <h2>3. No professional advice</h2>
        <p>
          The tools are general-purpose utilities. They do not constitute
          professional advice (legal, financial, medical, engineering or
          otherwise). For decisions where accuracy is critical, validate
          results against authoritative sources or a qualified
          professional.
        </p>

        <h2>4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site to break the law or infringe anyone&apos;s rights.</li>
          <li>
            Attempt to disrupt the site, probe it for vulnerabilities, or
            use it in a way that degrades service for other users.
          </li>
          <li>
            Use automated scrapers to mirror the site or extract data at
            scale without our prior written consent.
          </li>
          <li>
            Use the site to process content that is unlawful, infringing,
            malicious or that you do not have the right to use.
          </li>
        </ul>

        <h2>5. File processing</h2>
        <p>
          For tools that process files, processing happens in your browser
          and files are not uploaded. We do not view, copy, store or share
          files processed through the site. You are responsible for the
          files you choose to process.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The site&apos;s design, code, copy and graphics are owned by{" "}
          {SITE_NAME} or its licensors. You may view and use the site for
          personal or commercial purposes. You may not copy substantial
          portions of the site to republish elsewhere without permission.
        </p>

        <h2>7. Third-party content</h2>
        <p>
          The site may link to or display content from third parties (such
          as ad networks). We are not responsible for that content. Your
          use of third-party services is governed by their own terms.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {SITE_NAME} and its
          operators are not liable for any indirect, incidental, special,
          consequential or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly, or any loss of
          data, use or goodwill, resulting from your use of the site.
        </p>

        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold {SITE_NAME} harmless from any
          claim arising out of your breach of these terms or your use of
          the site.
        </p>

        <h2>10. Termination</h2>
        <p>
          We may restrict or terminate access to the site at any time, with
          or without notice, for conduct that violates these terms or is
          otherwise harmful to other users.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may update these terms from time to time. The &ldquo;Last
          updated&rdquo; date will reflect the latest revision. Continued
          use of the site after a change constitutes acceptance of the new
          terms.
        </p>

        <h2>12. Governing law</h2>
        <p>
          These terms are governed by the laws applicable to the operator
          of {SITE_NAME}, without regard to conflict-of-laws principles.
        </p>

        <h2>13. Contact</h2>
        <p>
          If you have any questions about these terms, please contact us at
          the address listed on our contact page.
        </p>
      </article>
    </div>
  );
}
