import Link from "next/link";
import { copy } from "@content/copy";
import { site } from "@content/site";
import { href, type RouteKey } from "@/lib/routes";
import { Container } from "@/components/ui/Container";

const links: RouteKey[] = ["trading", "ai", "about", "contact"];

/** Ft1 mast-headed footer: the typographic wordmark anchors one band; details sit beside it. */
export function Footer() {
  const { nav, footer } = copy;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule-2">
      <Container className="grid gap-xl pt-2xl pb-xl lg:grid-cols-12 lg:items-end">
        <p
          aria-hidden="true"
          className="font-display text-mast font-extrabold tracking-[0.02em] text-ink uppercase lg:col-span-7"
        >
          Terrafound
        </p>
        <div className="grid gap-md text-ink-2 lg:col-span-5">
          <p className="max-w-[40ch] text-ink">{footer.tagline}</p>
          <address className="not-italic">{site.address}</address>
          <a href={`mailto:${site.email}`} className="w-fit underline decoration-rule underline-offset-[0.35em] hover:decoration-accent">
            {site.email}
          </a>
        </div>
      </Container>
      <Container className="flex flex-col gap-sm border-t border-rule-2 py-lg text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. {footer.rights}
        </p>
        <ul className="flex flex-wrap gap-x-lg gap-y-xs">
          {links.map((k) => (
            <li key={k}>
              <Link href={href(k)} className="whitespace-nowrap hover:text-ink">
                {nav[k]}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
