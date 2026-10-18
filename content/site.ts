/**
 * Company-wide facts.
 */
export const site = {
  name: "Terrafound",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.terrafound.example",
  email: "info@trfound.com",
  address: "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, U.A.E.",
  mapEmbedUrl: "https://www.google.com/maps?q=Meydan+Grandstand+Meydan+Road+Nad+Al+Sheba+Dubai&output=embed",
} as const;
