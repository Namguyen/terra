import { ImageResponse } from "next/og";

export const alt = "Terrafound — General Trading · AI Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// sRGB approximations of the design.md tokens (ImageResponse can't read CSS variables):
// paper #1b1612 · ink #f2ece2 · ink-2 #cdc4b6 · accent #d07a52 · rule #4a4038
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1b1612",
          color: "#f2ece2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 6, display: "flex" }}>TERRAFOUND</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000, textTransform: "uppercase", display: "flex" }}>
          Solid foundations, from supply chain to technology.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 28, color: "#cdc4b6" }}>
          <div style={{ width: 80, height: 4, background: "#d07a52", display: "flex" }} />
          <span>General Trading</span>
          <span>·</span>
          <span>AI Consultancy</span>
          <span>·</span>
          <span>Dubai</span>
        </div>
      </div>
    ),
    size,
  );
}
