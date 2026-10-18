"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@content/copy";
import { href, type RouteKey } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/ButtonLink";
import { Logo } from "./Logo";

const navItems: RouteKey[] = ["trading", "ai", "about", "contact"];

export function Header({ nav }: { nav: Copy["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the menu and returns focus to the toggle; lock body scroll while open
  useEffect(() => {
    if (!open) return;
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
  const labels: Record<RouteKey, string> = {
    home: nav.home,
    trading: nav.trading,
    ai: nav.ai,
    about: nav.about,
    contact: nav.contact,
  };
  const quoteHref = href("contact", { interest: "trading" });

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-moss-900/10 bg-cream-50/95 shadow-[0_1px_12px_-6px_rgba(23,31,22,0.25)] backdrop-blur"
          : "border-transparent bg-cream-50/80 backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label={nav.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((key) => (
              <li key={key}>
                <Link
                  href={href(key)}
                  aria-current={isActive(key) ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4 ${
                    isActive(key) ? "bg-moss-900/8 text-moss-950" : "text-moss-800 hover:text-accent-700"
                  }`}
                >
                  {labels[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <Link href={quoteHref} className={buttonClasses("primary", "px-4 py-2.5")}>
              {nav.cta}
            </Link>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-moss-950 hover:bg-moss-900/5 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-moss-900/10 bg-cream-50 lg:hidden"
      >
        <Container className="py-6">
          <nav aria-label={nav.mainNav}>
            <ul className="divide-y divide-moss-900/10">
              {(["home", ...navItems] as RouteKey[]).map((key) => (
                <li key={key}>
                  <Link
                    href={href(key)}
                    aria-current={isActive(key) ? "page" : undefined}
                    className="flex items-center justify-between py-4 text-lg font-semibold text-moss-950"
                  >
                    {labels[key]}
                    <Icon name="arrowRight" className="size-5 text-accent-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href={quoteHref} className={buttonClasses("primary", "mt-6 w-full")}>
            {nav.cta}
          </Link>
        </Container>
      </div>
    </header>
  );
}
