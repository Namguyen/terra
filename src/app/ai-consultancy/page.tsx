import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { toJsonLd } from "@/lib/json-ld";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";

const t = copy.ai;

export const metadata: Metadata = buildMetadata({ route: "ai", title: t.meta.title, description: t.meta.description });

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
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        accent="text-ai"
        image={{ src: "/images/placeholders/ai.svg", alt: t.hero.imageAlt }}
        actions={
          <ButtonLink href={bookHref} withArrow>
            {t.hero.cta}
          </ButtonLink>
        }
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} />
          <div className="mt-12">
            <FeatureGrid
              items={t.services.items}
              icons={["search", "chat", "workflow", "chart"]}
              columns={4}
              iconTone="bg-ai-soft text-ai"
            />
          </div>
        </Container>
      </section>

      <section className="bg-cream-100 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
          <div className="mt-12">
            <ProcessSteps steps={t.process.steps} tone="bg-ai text-white" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow={t.cases.eyebrow} title={t.cases.title} />
            <PlaceholderNote>{t.cases.note}</PlaceholderNote>
          </div>
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {t.cases.items.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 90}>
                <article className="flex h-full flex-col rounded-2xl border border-moss-900/10 bg-white/70 p-7">
                  <p className="text-xs font-semibold tracking-[0.16em] text-ai uppercase">{c.sector}</p>
                  <h3 className="mt-3 text-xl">{c.title}</h3>
                  <dl className="mt-5 flex-1 space-y-4 text-sm leading-relaxed">
                    <div>
                      <dt className="font-semibold text-moss-950">{t.cases.labels.challenge}</dt>
                      <dd className="mt-1 text-muted">{c.challenge}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-moss-950">{t.cases.labels.solution}</dt>
                      <dd className="mt-1 text-muted">{c.solution}</dd>
                    </div>
                    <div className="rounded-xl bg-ai-soft p-4">
                      <dt className="font-semibold text-ai">{t.cases.labels.result}</dt>
                      <dd className="mt-1 text-moss-900">{c.result}</dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-cream-100 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          </div>
          <div className="lg:col-span-8">
            <Faq items={t.faq.items} />
          </div>
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }}
        />
      </section>

      <CtaBanner
        title={t.cta.title}
        body={t.cta.body}
        actions={
          <ButtonLink href={bookHref} withArrow>
            {copy.common.bookAiConsult}
          </ButtonLink>
        }
      />
    </>
  );
}
