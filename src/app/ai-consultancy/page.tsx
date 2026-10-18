import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { toJsonLd } from "@/lib/json-ld";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
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
