export const routes = {
  home: "/",
  trading: "/general-trading",
  ai: "/ai-consultancy",
  about: "/about",
  contact: "/contact",
} as const;

export type RouteKey = keyof typeof routes;

export function href(key: RouteKey, query?: Record<string, string>) {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";
  return `${routes[key]}${qs}`;
}
