import Link from "next/link";
import { copy } from "@content/copy";
import { site } from "@content/site";
import { href } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

export function Footer() {
  const { nav, footer } = copy;
  const year = new Date().getFullYear();

  return (
    <footer className="topo-bg bg-moss-950 text-cream-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-200">{footer.tagline}</p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider text-cream-50 uppercase">{footer.businessLines}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {(["trading", "ai"] as const).map((k) => (
              <li key={k}>
                <Link href={href(k)} className="hover:text-accent-300">
                  {nav[k]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold tracking-wider text-cream-50 uppercase">{footer.company}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {(["about", "contact"] as const).map((k) => (
              <li key={k}>
                <Link href={href(k)} className="hover:text-accent-300">
                  {nav[k]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider text-cream-50 uppercase">{footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 size-4 shrink-0 text-accent-300" />
              <span>{site.address}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 size-4 shrink-0 text-accent-300" />
              <a href={`mailto:${site.email}`} className="hover:text-accent-300">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-cream-50/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-cream-300 sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. {footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
