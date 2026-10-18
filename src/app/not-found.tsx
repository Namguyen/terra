import Link from "next/link";
import { copy } from "@content/copy";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-[0.18em] text-accent-600 uppercase">404</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">{copy.notFound.title}</h1>
        <p className="mt-6 text-muted">{copy.notFound.body}</p>
        <div className="mt-10 flex justify-center">
          <Link href="/" className={buttonClasses("primary")}>
            {copy.common.backHome}
          </Link>
        </div>
      </Container>
    </section>
  );
}
