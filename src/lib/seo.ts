import type { Metadata } from "next";
import { site } from "@content/site";
import { routes, type RouteKey } from "./routes";

type BuildMetadataArgs = {
  route: RouteKey;
  title?: string;
  description: string;
};

/** Per-page metadata: title, description, canonical URL and Open Graph. */
export function buildMetadata({ route, title, description }: BuildMetadataArgs): Metadata {
  const path = routes[route];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: title ? `${title} | ${site.name}` : undefined,
      description,
      url: path,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", description },
  };
}
