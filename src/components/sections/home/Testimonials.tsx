import { copy } from "@content/copy";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const t = copy.home.testimonials;
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <PlaceholderNote>{t.note}</PlaceholderNote>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {t.items.map((item, i) => (
            <Reveal as="li" key={i} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl bg-cream-100 p-7">
                <Icon name="quote" className="size-8 text-accent-500" />
                <blockquote className="mt-5 flex-1 leading-relaxed text-moss-900">“{item.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-moss-900/10 pt-5">
                  <p className="font-semibold text-moss-950">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
