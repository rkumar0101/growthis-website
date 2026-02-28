import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 18, color: "#111827" }}>GrowthAlis</div>
          <div style={{ fontSize: 62, fontWeight: 700, color: "#101010", lineHeight: 1.05 }}>
            Growth + automation
            <br />
            that converts.
          </div>
          <div style={{ fontSize: 22, color: "rgba(0,0,0,0.65)", maxWidth: 850 }}>
            Websites, funnels, and systems built like a product.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "rgb(225,29,46)" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "rgb(250,204,21)" }} />
          <div style={{ fontSize: 18, color: "rgba(0,0,0,0.65)" }}>growthalis.com</div>
        </div>

        {/* subtle arcs */}
        <div
          style={{
            position: "absolute",
            right: -180,
            top: -180,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(250,204,21,0.16)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -250,
            top: -90,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "rgba(225,29,46,0.10)",
          }}
        />
      </div>
    ),
    size
  );
}