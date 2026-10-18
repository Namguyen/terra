import Image from "next/image";
import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { LeadForm } from "@/components/forms/LeadForm";

const t = copy.trading;

export const metadata: Metadata = buildMetadata({ route: "trading", title: t.meta.title, description: t.meta.description });

const logisticsIcons: IconName[] = ["globe", "shield", "box", "search"];

export default function TradingPage() {
  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        accent="text-trading"
        image={{ src: "/images/placeholders/trading.svg", alt: t.hero.imageAlt }}
        actions={
          <ButtonLink href="#sourcing-request" withArrow>
            {t.form.title}
          </ButtonLink>
        }
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
          <div className="mt-12">
            <ProcessSteps steps={t.process.steps} tone="bg-trading text-white" />
          </div>
        </Container>
      </section>

      <section className="bg-cream-100 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.categories.eyebrow} title={t.categories.title} />
          <div className="mt-12">
            <FeatureGrid
              items={t.categories.items}
              icons={["building", "cpu", "leaf", "box", "bolt", "plus"]}
              iconTone="bg-trading-soft text-trading"
            />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-200">
            <Image
              src="/images/placeholders/warehouse.svg"
              alt={t.logistics.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow={t.logistics.eyebrow} title={t.logistics.title} subtitle={t.logistics.body} />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {t.logistics.items.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-trading-soft text-trading">
                    <Icon name={logisticsIcons[i]} className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="sourcing-request" className="scroll-mt-24 bg-cream-100 py-16 sm:py-24" aria-labelledby="sourcing-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="sourcing-title" eyebrow={t.form.eyebrow} title={t.form.title} subtitle={t.form.subtitle} />
          </div>
          <div className="rounded-3xl border border-moss-900/10 bg-cream-50 p-6 sm:p-10 lg:col-span-8">
            <LeadForm kind="sourcing" t={copy.form} />
          </div>
        </Container>
      </section>
    </>
  );
}
