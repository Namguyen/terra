import { copy } from "@content/copy";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="py-4xl">
      <Container>
        <p aria-hidden="true" className="tnum font-display text-display font-extrabold text-muted">
          404
        </p>
        <h1 className="mt-md text-2xl">{copy.notFound.title}</h1>
        <p className="mt-md max-w-[52ch] text-ink-2">{copy.notFound.body}</p>
        <div className="mt-xl">
          <TextLink href="/">{copy.common.backHome}</TextLink>
        </div>
      </Container>
    </section>
  );
}
