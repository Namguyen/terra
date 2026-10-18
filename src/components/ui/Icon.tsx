import type { SVGProps } from "react";

/** The page's only icons (24×24 stroke). Decorative by default (aria-hidden). */
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
};

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName; title?: string };

export function Icon({ name, title, className = "size-6", ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
