import { copy } from "@content/copy";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IntroStats() {
  const t = copy.home.intro;
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <p className="mt-6 text-lg leading-relaxed text-muted">{t.body}</p>
          <div className="mt-8">
            <ButtonLink href={href("about")} variant="ghost" withArrow>
              {t.cta}
            </ButtonLink>
          </div>
        </Reveal>

        <div className="lg:col-span-6">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-moss-900/10 bg-moss-900/10">
            {t.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="bg-cream-50 p-6 sm:p-8">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="mt-2 text-4xl font-extrabold tracking-tight text-moss-900 sm:text-5xl">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
          <div className="mt-4">
            <PlaceholderNote>{copy.common.placeholderNote}</PlaceholderNote>
          </div>
        </div>
      </Container>
    </section>
  );
}
