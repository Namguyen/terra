import type { Metadata } from "next";
import { copy } from "@content/copy";
import { buildMetadata } from "@/lib/seo";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { IntroStats } from "@/components/sections/home/IntroStats";
import { BusinessLineBlocks } from "@/components/sections/home/BusinessLineBlocks";
import { Partners } from "@/components/sections/home/Partners";
import { Testimonials } from "@/components/sections/home/Testimonials";

export const metadata: Metadata = {
  ...buildMetadata({ route: "home", description: copy.meta.siteDescription }),
  title: { absolute: copy.meta.siteTitle },
};

export default function HomePage() {
  const t = copy.home;

  return (
    <>
      <HomeHero />
      <IntroStats />
      <BusinessLineBlocks />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} />
          <div className="mt-12">
            <FeatureGrid items={t.why.items} icons={["shield", "truck", "tag", "cpu"]} columns={4} />
          </div>
        </Container>
      </section>

      <Partners />
      <Testimonials />

      <CtaBanner
        title={t.finalCta.title}
        body={t.finalCta.body}
        actions={
          <>
            <ButtonLink href={href("contact", { interest: "trading" })} withArrow>
              {t.finalCta.primary}
            </ButtonLink>
            <ButtonLink href={href("contact", { interest: "ai" })} variant="outlineLight">
              {t.finalCta.secondary}
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
