import Image from "next/image";
import { copy } from "@content/copy";
import { businessLineKeys, businessLines } from "@/lib/business-lines";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BusinessLineBlocks() {
  const t = copy.home.lines;
  return (
    <section className="bg-cream-100 py-16 sm:py-24" aria-labelledby="business-lines-title">
      <Container>
        <SectionHeading id="business-lines-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div className="mt-12 space-y-6 lg:space-y-8">
          {businessLineKeys.map((key, i) => {
            const line = businessLines[key];
            const lineCopy = copy.businessLines[key];
            const reversed = i % 2 === 1;
            return (
              <Reveal
                as="article"
                key={key}
                className="group grid overflow-hidden rounded-3xl border border-moss-900/10 bg-cream-50 md:grid-cols-2"
              >
                <div className={`relative min-h-60 overflow-hidden ${reversed ? "md:order-2" : ""}`}>
                  <Image
                    src={line.image}
                    alt={lineCopy.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <span className={`inline-flex size-12 items-center justify-center rounded-xl ${line.softBg} ${line.text}`}>
                    <Icon name={line.icon} className="size-6" />
                  </span>
                  <p className={`mt-6 text-xs font-semibold tracking-[0.18em] uppercase ${line.text}`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl sm:text-3xl">{lineCopy.name}</h3>
                  <p className="mt-4 leading-relaxed text-muted">{lineCopy.long}</p>
                  <div className="mt-8">
                    <ButtonLink href={href(line.route)} variant="secondary" withArrow>
                      {copy.common.learnMore}
                      <span className="sr-only">: {lineCopy.name}</span>
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
