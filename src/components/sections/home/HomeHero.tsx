import Image from "next/image";
import Link from "next/link";
import { copy } from "@content/copy";
import { businessLineKeys, businessLines } from "@/lib/business-lines";
import { href } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

export function HomeHero() {
  const t = copy.home.hero;

  return (
    <section className="relative overflow-hidden bg-moss-950 text-cream-50">
      <Image
        src="/images/placeholders/hero.svg"
        alt={t.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-moss-950 via-moss-950/85 to-moss-950/30" />

      <Container className="relative pt-16 pb-10 sm:pt-24 lg:pt-32">
        <div className="max-w-3xl animate-fade-up">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-300 uppercase">{t.eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.05] text-cream-50 sm:text-6xl lg:text-7xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-200">{t.subtitle}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={href("contact", { interest: "trading" })} withArrow>
              {t.primaryCta}
            </ButtonLink>
            <ButtonLink href={href("contact", { interest: "ai" })} variant="outlineLight">
              {t.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        {/* Shortcut cards to the business lines */}
        <nav aria-label={t.shortcutsLabel} className="mt-14 lg:mt-24">
          <ul className="grid gap-4 md:grid-cols-2 lg:max-w-4xl">
            {businessLineKeys.map((key, i) => {
              const line = businessLines[key];
              const lineCopy = copy.businessLines[key];
              return (
                <li key={key} className="animate-fade-up" style={{ animationDelay: `${150 + i * 100}ms` }}>
                  <Link
                    href={href(line.route)}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-cream-50/15 bg-cream-50/[0.06] p-5 backdrop-blur-md transition-colors duration-300 hover:border-cream-50/35 hover:bg-cream-50/[0.12]"
                  >
                    <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-xl ${line.softBg} ${line.text}`}>
                      <Icon name={line.icon} />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2 font-semibold text-cream-50">
                        {lineCopy.name}
                        <Icon
                          name="arrowRight"
                          className="size-4 text-accent-300 transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-cream-200">{lineCopy.short}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
