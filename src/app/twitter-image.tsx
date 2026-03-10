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
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 18, color: "#111827" }}>GrowthAlis</div>

          <div
            style={{
              marginTop: 10,
              fontSize: 60,
              fontWeight: 700,
              color: "#101010",
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Build systems</span>
            <span>that convert.</span>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "rgb(225,29,46)",
                display: "flex",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "rgb(250,204,21)",
                display: "flex",
              }}
            />
            <div style={{ fontSize: 18, color: "rgba(0,0,0,0.65)" }}>
              Web • Marketing • Automation
            </div>
          </div>
        </div>

        {/* subtle circle */}
        <div
          style={{
            position: "absolute",
            right: -220,
            top: -220,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(225,29,46,0.08)",
            display: "flex",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}