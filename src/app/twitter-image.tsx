import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 18, color: "#111827" }}>GrowthAlis</div>
        <div style={{ marginTop: 10, fontSize: 60, fontWeight: 700, color: "#101010", lineHeight: 1.05 }}>
          Build systems
          <br />
          that convert.
        </div>
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "rgb(225,29,46)" }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "rgb(250,204,21)" }} />
          <div style={{ fontSize: 18, color: "rgba(0,0,0,0.65)" }}>Web • Marketing • Automation</div>
        </div>
      </div>
    ),
    size
  );
}