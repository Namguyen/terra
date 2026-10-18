import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** Page close: one large statement, a sentence, the actions. Left-biased, no banner box. */
export function Closing({ title, body, actions }: { title: string; body: string; actions: ReactNode }) {
  return (
    <section className="border-t border-rule-2 bg-paper-2">
      <Container className="py-3xl">
        <h2 className="max-w-[18ch] text-display-s">{title}</h2>
        <div className="mt-xl grid gap-lg lg:grid-cols-12 lg:items-center">
          <p className="max-w-[52ch] text-md text-ink-2 lg:col-span-6">{body}</p>
          <div className="flex flex-wrap items-center gap-lg lg:col-span-6 lg:justify-end">{actions}</div>
        </div>
      </Container>
    </section>
  );
}
