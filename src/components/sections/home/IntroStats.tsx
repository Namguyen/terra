import { copy } from "@content/copy";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IntroStats() {
  const t = copy.home.intro;
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <p className="mt-6 text-lg leading-relaxed text-muted">{t.body}</p>
          <div className="mt-8">
            <ButtonLink href={href("about")} variant="ghost" withArrow>
              {t.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
