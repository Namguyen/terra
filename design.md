# Design — Terrafound

A locked design system for trfound.com. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow. Tokens live in [`tokens.css`](tokens.css); nothing else defines colour or type.

## Genre
editorial — tone: technical luxury. Theme route: custom (tuned), vibe "desert trade routes, terracotta, precise, after dark".

## Macrostructure family
- Marketing home (`/`): **Map / Diagram** — the hero is a hand-built SVG route map: two service routes (Trading, AI) meeting at the Dubai desk. Below: intro statement, Split Studio diptych per business line, ledger, closing.
- Service pages (`/general-trading`, `/ai-consultancy`): **Narrative Workflow** — numbered stages 1.0 → 5.0 (genuinely ordinal), ledgers for categories / services, form or FAQ.
- Content page (`/about`): **Long Document** — prose at 65ch, statements, values ledger.
- Utility (`/contact`, 404): page intro + form / details. No enrichment.

## Theme
- `--color-paper`   oklch(16% 0.012 55)
- `--color-paper-2` oklch(19.5% 0.014 55)
- `--color-paper-3` oklch(24% 0.015 55)
- `--color-ink`     oklch(94% 0.012 75)
- `--color-ink-2`   oklch(82% 0.014 70)
- `--color-muted`   oklch(70% 0.014 65)
- `--color-rule`    oklch(34% 0.014 55)
- `--color-rule-2`  oklch(26% 0.012 55)
- `--color-accent`  oklch(68% 0.15 42) — terracotta
- `--color-focus`   oklch(78% 0.17 48)
- State: `--color-danger` oklch(72% 0.15 25) · `--color-success` oklch(80% 0.11 145)

Accent is a signal, never a surface: the Trading route + Dubai hub on the map, the primary button, focus, selection, link underline on hover. ≤ 5 % of any viewport.

## Typography
- Display: Big Shoulders (variable, opsz), weight 800, roman, uppercase, tracking 0.01em, line-height ≥ 1.02
- Body: IBM Plex Sans 400 / 500
- Outlier: IBM Plex Mono 400 — map annotations and coordinates only
- Scale: major third from 16px; `--text-display` = clamp(3rem, 6vw + 1rem, 6rem); hero headlines > 50 chars use `--text-display-s`
- No italic headers. No eyebrows, except the ordinal stage numbers on Narrative Workflow pages.

## Spacing
4-point named scale (`3xs … 4xl`) in `tokens.css`, exposed as Tailwind utilities (`p-xl`, `gap-lg`). Section padding varies on purpose.

## Motion
- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1), `--ease-in`, `--ease-in-out`
- One orchestrated entrance: the home route map draws on load, then its stations fade in (≤ 5 stagger steps). Nothing reveals on scroll.
- Hover: 1px lift on buttons, underline thickening on links. Reduced motion: everything appears instantly.

## Microinteractions stance
- Silent success; form errors inline under the field; submit button shows "Sending…".
- Focus ring: 2px `--color-focus`, offset 3px, never animated.

## CTA voice
- Primary: terracotta fill, ink-dark text, 2px radius, no pill, single line ("Request a quote").
- Secondary: typographic link — words + arrow + 1px underline that turns accent on hover.

## Per-page allowances
- Home MAY use the route-map enrichment (Tier B hand-built SVG). No other page carries imagery.
- No stock or placeholder illustrations, ever. No invented metrics, clients or testimonials.

## What pages MUST share
- The typographic wordmark TERRAFOUND (no logo mark until a trademarked one exists).
- N9 edge-aligned header (wordmark · quote button · index menu) and Ft1 mast-headed footer.
- Accent placement, display + body fonts, CTA voice, hairline-ruled ledgers instead of cards.

## What pages MAY differ on
- Macrostructure within the family above.
- Ledger vs step sequence vs prose for the main body.

## Exports

### tokens.css
See [`tokens.css`](tokens.css) — it is written as a Tailwind v4 `@theme` block, so it doubles as the Tailwind export.
