import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { href, type RouteKey } from "@/lib/routes";
import { ButtonLink, TextLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Closing } from "@/components/sections/Closing";
import { Ledger } from "@/components/sections/Ledger";
import { RouteMap } from "@/components/sections/home/RouteMap";

export const metadata: Metadata = {
  ...buildMetadata({ route: "home", description: copy.meta.siteDescription }),
  title: { absolute: copy.meta.siteTitle },
};

/* Hallmark · macrostructure: Map / Diagram · hero: H9 custom illustration (route map) · body: split diptychs + F3 ledger */
export default function HomePage() {
  const t = copy.home;

  // Split rows: each business line pairs its explanation with the list of what it covers
  const lines: { route: RouteKey; name: string; long: string; proof: string[] }[] = [
    {
      route: "trading",
      name: copy.businessLines.trading.name,
      long: copy.businessLines.trading.long,
      proof: copy.trading.categories.items.map((c) => c.title),
    },
    {
      route: "ai",
      name: copy.businessLines.ai.name,
      long: copy.businessLines.ai.long,
      proof: copy.ai.services.items.map((s) => s.title),
    },
  ];

  return (
    <>
      <section className="border-b border-rule-2">
        <Container className="pt-2xl pb-3xl">
          <div className="grid gap-xl lg:grid-cols-12 lg:items-end">
            <h1 className="text-display-s lg:col-span-8">{t.hero.title}</h1>
            <div className="lg:col-span-4">
              <p className="text-md text-ink-2">{t.hero.subtitle}</p>
              <div className="mt-lg flex flex-wrap items-center gap-lg">
                <ButtonLink href={href("contact", { interest: "trading" })}>{t.hero.primaryCta}</ButtonLink>
                <TextLink href={href("contact", { interest: "ai" })}>{t.hero.secondaryCta}</TextLink>
              </div>
            </div>
          </div>
          <RouteMap />
        </Container>
      </section>

      <section>
        <Container className="grid gap-lg pt-2xl pb-3xl lg:grid-cols-12">
          <h2 className="text-2xl lg:col-span-5">{t.intro.title}</h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-md text-ink-2">{t.intro.body}</p>
            <div className="mt-lg">
              <TextLink href={href("about")}>{t.intro.cta}</TextLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="lines-title" className="pb-2xl">
        <Container>
          <h2 id="lines-title" className="sr-only">
            {t.lines.title}
          </h2>
          {lines.map((line, i) => (
            <article key={line.route} className="grid gap-xl border-t border-rule py-2xl lg:grid-cols-12 lg:gap-lg">
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`}>
                <h3 className="text-3xl">{line.name}</h3>
                <p className="mt-md max-w-[52ch] text-md text-ink-2">{line.long}</p>
                <div className="mt-lg">
                  <TextLink href={href(line.route)}>
                    {copy.common.learnMore}
                    <span className="sr-only">: {line.name}</span>
                  </TextLink>
                </div>
              </div>
              <ul className={`self-end lg:col-span-5 ${i % 2 ? "lg:order-1" : "lg:col-start-8"}`}>
                {line.proof.map((item) => (
                  <li key={item} className="border-b border-rule-2 py-sm text-ink-2 first:border-t">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Container>
      </section>

      <section className="border-t border-rule-2 py-3xl">
        <Container>
          <h2 className="max-w-[20ch] text-2xl">{t.why.title}</h2>
          <Ledger items={t.why.items} className="mt-xl" />
        </Container>
      </section>

      <Closing
        title={t.finalCta.title}
        body={t.finalCta.body}
        actions={
          <>
            <ButtonLink href={href("contact", { interest: "trading" })}>{t.finalCta.primary}</ButtonLink>
            <TextLink href={href("contact", { interest: "ai" })}>{t.finalCta.secondary}</TextLink>
          </>
        }
      />
    </>
  );
}
