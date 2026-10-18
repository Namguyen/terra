/**
 * Company-wide facts.
 */
export const site = {
  name: "Terrafound",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.terrafound.example",
  email: "info@trfound.com",
  address: "Meydan Free Zone, Meydan Grandstand, 6th Floor, Nad Al Sheba, Dubai, United Arab Emirates",
  mapEmbedUrl: "https://www.google.com/maps?q=Meydan+Free+Zone+Dubai&output=embed",
} as const;
