import { ImageResponse } from "next/og";

export const alt = "Terrafound — General Trading · AI Consultancy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Static Open Graph image shared by all pages. Replace with a designed image if preferred
// (drop an opengraph-image.png next to this file and delete this file).
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
          background: "linear-gradient(135deg, #171f16 0%, #2c3b29 60%, #644733 100%)",
          color: "#f6f1e7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#f6f1e7", display: "flex" }} />
          <div style={{ fontSize: 48, fontWeight: 800, display: "flex" }}>
            Terra<span style={{ color: "#e3a37f" }}>found</span>
          </div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, maxWidth: 950, display: "flex" }}>
          Solid foundations, from supply chain to technology.
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 28, color: "#ddd0b8" }}>
          <span>General Trading</span>
          <span style={{ color: "#c8693a" }}>·</span>
          <span>AI Consultancy</span>
        </div>
      </div>
    ),
    size,
  );
}
