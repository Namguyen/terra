/** Serialises structured data for a <script type="application/ld+json"> tag, escaping "<" so it can't close the tag. */
export function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
