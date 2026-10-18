import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";

const variants: Record<Variant, string> = {
  primary: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm",
  secondary: "bg-moss-900 text-cream-50 hover:bg-moss-800",
  ghost: "text-moss-900 ring-1 ring-inset ring-moss-900/25 hover:bg-moss-900/5",
  light: "bg-cream-50 text-moss-950 hover:bg-cream-200",
  outlineLight: "text-cream-50 ring-1 ring-inset ring-cream-50/40 hover:bg-cream-50/10",
};

export const buttonClasses = (variant: Variant = "primary", className = "") =>
  `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 ${variants[variant]} ${className}`;

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", withArrow, className }: ButtonLinkProps) {
  return (
    <Link href={href} className={`group ${buttonClasses(variant, className)}`}>
      {children}
      {withArrow ? (
        <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
