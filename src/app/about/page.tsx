import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/sections/PageIntro";
import { Ledger } from "@/components/sections/Ledger";
import { Closing } from "@/components/sections/Closing";

const t = copy.about;

export const metadata: Metadata = buildMetadata({ route: "about", title: t.meta.title, description: t.meta.description });

/* Hallmark · macrostructure: Long Document · design-system: design.md · designed-as-app */
export default function AboutPage() {
  return (
    <>
      <PageIntro title={t.hero.title} subtitle={t.hero.subtitle} />

      <section className="py-3xl">
        <Container className="grid gap-lg lg:grid-cols-12">
          <h2 className="text-2xl lg:col-span-4">{t.story.title}</h2>
          <div className="grid max-w-[65ch] gap-md lg:col-span-7 lg:col-start-6">
            {t.story.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-md text-ink" : "text-ink-2"}>
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-rule-2 bg-paper-2">
        <Container className="grid lg:grid-cols-2">
          {[t.mission, t.vision].map((block, i) => (
            <div
              key={block.title}
              className={`py-2xl ${i ? "border-t border-rule-2 lg:border-t-0 lg:border-l lg:ps-xl" : "lg:pe-xl"}`}
            >
              <h2 className="text-lg text-muted">{block.title}</h2>
              <p className="mt-md max-w-[30ch] text-xl leading-snug text-ink">{block.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-3xl">
        <Container>
          <h2 className="text-2xl">{t.values.title}</h2>
          <Ledger items={t.values.items} className="mt-xl" />
        </Container>
      </section>

      <Closing
        title={copy.home.finalCta.title}
        body={copy.home.finalCta.body}
        actions={<ButtonLink href={href("contact")}>{copy.common.contactUs}</ButtonLink>}
      />
    </>
  );
}
