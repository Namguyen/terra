import Image from "next/image";
import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";

const t = copy.about;

export const metadata: Metadata = buildMetadata({ route: "about", title: t.meta.title, description: t.meta.description });

export default function AboutPage() {

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        image={{ src: "/images/placeholders/about.svg", alt: t.hero.imageAlt }}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={t.story.eyebrow} title={t.story.title} />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-7">
            {t.story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="grid gap-5 md:grid-cols-2">
          {[t.mission, t.vision].map((block, i) => (
            <Reveal
              key={block.title}
              delay={i * 90}
              className={`rounded-3xl p-8 sm:p-10 ${i === 0 ? "topo-bg bg-moss-900 text-cream-50" : "bg-earth-100"}`}
            >
              <h2 className={`text-2xl ${i === 0 ? "text-cream-50" : ""}`}>{block.title}</h2>
              <p className={`mt-4 text-lg leading-relaxed ${i === 0 ? "text-cream-200" : "text-earth-900"}`}>
                {block.body}
              </p>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-cream-100 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.values.eyebrow} title={t.values.title} />
          <div className="mt-12">
            <FeatureGrid items={t.values.items} icons={["shield", "eye", "users", "trending"]} columns={4} />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading eyebrow={t.team.eyebrow} title={t.team.title} />
            <PlaceholderNote>{t.team.note}</PlaceholderNote>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {t.team.members.map((m, i) => (
              <Reveal as="li" key={m.role} delay={i * 80}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200">
                  <Image
                    src="/images/placeholders/portrait.svg"
                    alt={t.team.photoAlt.replace("{name}", m.name)}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold">{m.name}</h3>
                <p className="text-sm text-muted">{m.role}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner
        title={copy.home.finalCta.title}
        body={copy.home.finalCta.body}
        actions={
          <ButtonLink href={href("contact")} withArrow>
            {copy.common.contactUs}
          </ButtonLink>
        }
      />
    </>
  );
}
