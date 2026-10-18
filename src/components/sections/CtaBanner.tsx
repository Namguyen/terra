import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Dark call-to-action band used at the bottom of pages. */
export function CtaBanner({ title, body, actions }: { title: string; body: string; actions: ReactNode }) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="topo-bg relative overflow-hidden rounded-3xl bg-moss-900 px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight text-cream-50 sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-cream-200 sm:text-lg">{body}</p>
          </div>
          <div className="mt-8 flex shrink-0 flex-wrap gap-3 lg:mt-0">{actions}</div>
        </Reveal>
      </Container>
    </section>
  );
}
