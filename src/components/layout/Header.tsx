"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@content/copy";
import { href, routes, type RouteKey } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { Wordmark } from "./Wordmark";

const routeKeys = Object.keys(routes) as RouteKey[];

/**
 * N9 edge-aligned header: wordmark hard-left, quote button + index toggle hard-right.
 * The page list lives in a full-height index sheet instead of an inline link row.
 */
export function Header({ nav, descriptions }: { nav: Copy["nav"]; descriptions: Record<RouteKey, string> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the index on navigation
  useEffect(() => setOpen(false), [pathname]);

  // While open: move focus in, Escape closes and returns focus to the toggle, lock body scroll
  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (key: RouteKey) => (key === "home" ? pathname === "/" : pathname?.startsWith(href(key)));

  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-rule-2 bg-paper">
      <Container className="flex h-[4.5rem] items-center justify-between gap-md">
        <Wordmark />

        <div className="flex items-center gap-sm">
          <Link href={href("contact", { interest: "trading" })} className={buttonClasses("primary", "px-md py-xs max-sm:hidden")}>
            {nav.cta}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={buttonClasses("outline", "px-md py-xs")}
            aria-expanded={open}
            aria-controls="site-index"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </Container>

      <div id="site-index" hidden={!open} className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-paper-2">
        <Container className="py-xl sm:py-2xl">
          <nav aria-label={nav.mainNav}>
            <ul>
              {routeKeys.map((key, i) => (
                <li key={key} className="border-b border-rule-2 first:border-t">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={href(key)}
                    aria-current={isActive(key) ? "page" : undefined}
                    className="group grid gap-2xs py-lg md:grid-cols-12 md:items-baseline md:gap-lg"
                  >
                    <span className="font-display text-2xl font-extrabold tracking-[0.01em] text-ink uppercase group-hover:text-accent group-aria-[current=page]:text-accent md:col-span-6 md:text-3xl">
                      {nav[key]}
                    </span>
                    <span className="max-w-[52ch] text-ink-2 md:col-span-6">{descriptions[key]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={href("contact", { interest: "trading" })} className={buttonClasses("primary", "mt-xl w-full sm:hidden")}>
            {nav.cta}
          </Link>
        </Container>
      </div>
    </header>
  );
}
