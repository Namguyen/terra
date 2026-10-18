import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: { src: string; alt: string };
  /** Tailwind text color class for the eyebrow/accent bar, e.g. "text-trading" */
  accent?: string;
  actions?: ReactNode;
};

/** Hero banner used on inner pages. */
export function PageHero({ eyebrow, title, subtitle, image, accent = "text-accent-600", actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-moss-900/10 bg-cream-100">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <p className={`flex items-center gap-3 text-xs font-semibold tracking-[0.18em] uppercase ${accent}`}>
            <span aria-hidden="true" className="h-0.5 w-8 bg-current" />
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl leading-[1.08] sm:text-5xl lg:text-[3.4rem]">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-200 shadow-xl shadow-moss-950/10">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
