import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Alert } from "@/components/ui/Alert";
import { SITE_NAME, pageUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact — ${SITE_NAME}`,
  description: `Get in touch with the ${SITE_NAME} team.`,
  alternates: { canonical: pageUrl("/contact") },
};

export default function ContactPage() {
  return (
    <div className="container-narrow py-8 sm:py-10">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <header className="mt-4">
        <h1 className="h-tool">Contact</h1>
        <p className="mt-2 max-w-2xl text-base text-ink-600">
          We&apos;d love to hear from you. Reach out for bug reports, feature
          suggestions or partnership enquiries.
        </p>
      </header>

      <div className="mt-8 max-w-2xl space-y-5">
        <section className="card p-5">
          <h2 className="text-lg font-semibold text-ink-900">General enquiries</h2>
          <p className="mt-2 text-sm text-ink-700">
            For general questions, feedback and ideas, email{" "}
            <a
              className="text-brand-700 underline-offset-2 hover:underline"
              href="mailto:hello@nettoolkit.app"
            >
              hello@nettoolkit.app
            </a>
            .
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-semibold text-ink-900">Bug reports</h2>
          <p className="mt-2 text-sm text-ink-700">
            Found something broken or incorrect? Please email{" "}
            <a
              className="text-brand-700 underline-offset-2 hover:underline"
              href="mailto:bugs@nettoolkit.app"
            >
              bugs@nettoolkit.app
            </a>{" "}
            with a short description and the URL of the tool you were using.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-semibold text-ink-900">
            Tool suggestions
          </h2>
          <p className="mt-2 text-sm text-ink-700">
            We&apos;re always looking for new tools to add. Send your idea to{" "}
            <a
              className="text-brand-700 underline-offset-2 hover:underline"
              href="mailto:hello@nettoolkit.app"
            >
              hello@nettoolkit.app
            </a>{" "}
            with a one-line description and a sample input/output.
          </p>
        </section>

        <Alert variant="info" title="Response times">
          We&apos;re a small team. We try to respond within a few business
          days, but please be patient if it takes a little longer.
        </Alert>
      </div>
    </div>
  );
}
