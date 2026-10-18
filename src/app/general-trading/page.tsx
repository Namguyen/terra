import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/sections/PageIntro";
import { StepSequence } from "@/components/sections/StepSequence";
import { Ledger } from "@/components/sections/Ledger";
import { LeadForm } from "@/components/forms/LeadForm";

const t = copy.trading;

export const metadata: Metadata = buildMetadata({ route: "trading", title: t.meta.title, description: t.meta.description });

/* Hallmark · macrostructure: Narrative Workflow · design-system: design.md · designed-as-app */
export default function TradingPage() {
  return (
    <>
      <PageIntro
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        actions={<ButtonLink href="#sourcing-request">{t.form.title}</ButtonLink>}
      />

      <section className="py-3xl">
        <Container>
          <h2 className="max-w-[20ch] text-2xl">{t.process.title}</h2>
          <div className="mt-xl">
            <StepSequence steps={t.process.steps} />
          </div>
        </Container>
      </section>

      <section className="border-y border-rule-2 bg-paper-2 py-2xl">
        <Container>
          <h2 className="max-w-[20ch] text-2xl">{t.categories.title}</h2>
          <Ledger items={t.categories.items} className="mt-xl" />
        </Container>
      </section>

      <section className="py-3xl">
        <Container className="grid gap-xl lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl">{t.logistics.title}</h2>
            <p className="mt-md max-w-[52ch] text-md text-ink-2">{t.logistics.body}</p>
          </div>
          <Ledger items={t.logistics.items} className="lg:col-span-6 lg:col-start-7" />
        </Container>
      </section>

      <section id="sourcing-request" className="scroll-mt-[5rem] border-t border-rule-2 py-3xl" aria-labelledby="sourcing-title">
        <Container className="grid gap-xl lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[7rem]">
              <h2 id="sourcing-title" className="text-2xl">
                {t.form.title}
              </h2>
              <p className="mt-md text-ink-2">{t.form.subtitle}</p>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <LeadForm kind="sourcing" t={copy.form} />
          </div>
        </Container>
      </section>
    </>
  );
}
