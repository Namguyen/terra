import type { CSSProperties } from "react";
import { copy } from "@content/copy";

/*
 * Hero enrichment (Tier B, hand-built SVG): the two service routes as a transit-style diagram.
 * Both routes run through one hub — the Dubai desk. Station names are the real process steps
 * from content/copy.ts; nothing on the map is invented.
 */

const W = 1200;
const H = 500;
const HUB = { x: 600, y: 250 };
// Where the two routes have diverged far enough to fit the hub's name between them
const HUB_LABEL = { x: 700, y: 250 };

type Pt = { x: number; y: number };

// Two stations before the hub, three after — matches the five process steps of each line
const tradingPts: Pt[] = [
  { x: 40, y: 380 },
  { x: 300, y: 330 },
  { x: 820, y: 320 },
  { x: 990, y: 395 },
  { x: 1160, y: 340 },
];
const aiPts: Pt[] = [
  { x: 40, y: 110 },
  { x: 300, y: 160 },
  { x: 820, y: 180 },
  { x: 990, y: 105 },
  { x: 1160, y: 150 },
];

const withHub = (pts: Pt[]) => [pts[0], pts[1], HUB, pts[2], pts[3], pts[4]];
const toPath = (pts: Pt[]) => pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");

/** Percentage position of a map point, so HTML labels track the SVG at any width. */
const at = (p: Pt): CSSProperties => ({ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` });

/** Edge stations align inward so their labels never leave the map. */
const alignX = (i: number, n: number) => (i === 0 ? "translate-x-0" : i === n - 1 ? "-translate-x-full" : "-translate-x-1/2");

const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

export function RouteMap() {
  const t = copy.home.map;
  const routes = [
    { key: "trading", pts: tradingPts, steps: copy.trading.process.steps, below: true },
    { key: "ai", pts: aiPts, steps: copy.ai.process.steps, below: false },
  ] as const;

  return (
    <figure className="mt-xl">
      <div className="relative aspect-[1200/500] w-full">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
          {/* Graticule — the map's paper */}
          <g className="stroke-rule-2" strokeWidth={1} vectorEffect="non-scaling-stroke">
            {Array.from({ length: 9 }, (_, i) => (
              <line key={`h${i}`} x1={0} x2={W} y1={50 + i * 50} y2={50 + i * 50} strokeDasharray="2 8" />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
              <line key={`v${i}`} y1={0} y2={H} x1={100 + i * 100} x2={100 + i * 100} strokeDasharray="2 8" />
            ))}
          </g>

          <path d={toPath(withHub(aiPts))} pathLength={1} className="route-line fill-none stroke-ink-2" strokeWidth={2} strokeLinejoin="round" />
          <path d={toPath(withHub(tradingPts))} pathLength={1} className="route-line fill-none stroke-accent" strokeWidth={4} strokeLinejoin="round" />

          {routes.map((r) =>
            r.pts.map((p, i) => (
              <circle
                key={`${r.key}${i}`}
                cx={p.x}
                cy={p.y}
                r={r.key === "trading" ? 8 : 6}
                strokeWidth={r.key === "trading" ? 4 : 2}
                className={`route-station fill-paper ${r.key === "trading" ? "stroke-accent" : "stroke-ink-2"}`}
                style={stagger(i)}
              />
            )),
          )}

          <g className="route-station" style={stagger(2)}>
            <circle cx={HUB.x} cy={HUB.y} r={22} className="fill-none stroke-accent" strokeWidth={1.5} />
            <circle cx={HUB.x} cy={HUB.y} r={9} className="fill-accent" />
          </g>
        </svg>

        {/* Station labels (md+). Hidden from assistive tech — the ordered lists below carry the same content. */}
        <div aria-hidden="true" className="hidden md:block">
          {routes.map((r) =>
            r.pts.map((p, i) => (
              <span
                key={`${r.key}${i}`}
                style={{ ...at(p), ...stagger(i) }}
                className={`route-station absolute w-max max-w-[11rem] font-mono text-xs leading-tight text-ink-2 uppercase ${alignX(i, r.pts.length)} ${
                  r.below !== (i === r.pts.length - 1) ? "translate-y-md" : "-translate-y-[calc(100%+var(--spacing-md))]"
                } ${i === 0 ? "text-left" : i === r.pts.length - 1 ? "text-right" : "text-center"}`}
              >
                {r.steps[i].title}
              </span>
            )),
          )}
          <span style={{ ...at(HUB_LABEL), ...stagger(2) }} className="route-station absolute w-max -translate-y-1/2">
            <span className="block font-display text-lg font-extrabold tracking-[0.02em] text-ink uppercase">{t.hub}</span>
            <span className="tnum block font-mono text-xs text-muted">{t.coords}</span>
          </span>
        </div>
      </div>

      <figcaption className="mt-lg grid gap-lg border-t border-rule-2 pt-lg md:grid-cols-12">
        <p className="sr-only">{t.label}</p>
        {routes.map((r) => (
          <div key={r.key} className="md:col-span-4">
            <p className="flex items-center gap-sm font-medium text-ink">
              <span aria-hidden="true" className={`inline-block w-xl ${r.key === "trading" ? "h-[4px] bg-accent" : "h-[2px] bg-ink-2"}`} />
              {t.legend[r.key]}
            </p>
            <ol className="mt-xs list-inside list-decimal text-ink-2 md:sr-only">
              {r.steps.map((s) => (
                <li key={s.title}>{s.title}</li>
              ))}
            </ol>
          </div>
        ))}
        <p className="tnum text-xs text-muted md:col-span-4 md:text-right">
          {t.hub} · {t.coords}
        </p>
      </figcaption>
    </figure>
  );
}
