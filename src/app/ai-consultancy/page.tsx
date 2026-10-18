import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { toJsonLd } from "@/lib/json-ld";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/sections/PageIntro";
import { StepSequence } from "@/components/sections/StepSequence";
import { Ledger } from "@/components/sections/Ledger";
import { Faq } from "@/components/sections/Faq";
import { Closing } from "@/components/sections/Closing";

const t = copy.ai;

export const metadata: Metadata = buildMetadata({ route: "ai", title: t.meta.title, description: t.meta.description });

/* Hallmark · macrostructure: Narrative Workflow · design-system: design.md · designed-as-app */
export default function AiPage() {
  const bookHref = href("contact", { interest: "ai" });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <PageIntro title={t.hero.title} subtitle={t.hero.subtitle} actions={<ButtonLink href={bookHref}>{t.hero.cta}</ButtonLink>} />

      <section className="py-3xl">
        <Container>
          <h2 className="max-w-[20ch] text-2xl">{t.services.title}</h2>
          <Ledger items={t.services.items} className="mt-xl" />
        </Container>
      </section>

      <section className="border-y border-rule-2 bg-paper-2 py-2xl">
        <Container>
          <h2 className="max-w-[20ch] text-2xl">{t.process.title}</h2>
          <div className="mt-xl">
            <StepSequence steps={t.process.steps} />
          </div>
        </Container>
      </section>

      <section className="py-3xl">
        <Container className="grid gap-xl lg:grid-cols-12">
          <h2 className="text-2xl lg:col-span-4">{t.faq.title}</h2>
          <div className="lg:col-span-8">
            <Faq items={t.faq.items} />
          </div>
        </Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      </section>

      <Closing title={t.cta.title} body={t.cta.body} actions={<ButtonLink href={bookHref}>{copy.common.bookAiConsult}</ButtonLink>} />
    </>
  );
}
