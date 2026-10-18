import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Inner-page opening: headline left (8 cols), lede and actions right, bottom-aligned. */
export function PageIntro({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <section className="border-b border-rule-2">
      <Container className="grid gap-xl pt-2xl pb-3xl lg:grid-cols-12 lg:items-end">
        <h1 className="text-display-s lg:col-span-8">{title}</h1>
        <div className="lg:col-span-4">
          <p className="text-md text-ink-2">{subtitle}</p>
          {actions ? <div className="mt-lg flex flex-wrap items-center gap-lg">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
