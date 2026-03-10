import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "rgb(225, 29, 46)",
          color: "#ffffff",
          fontSize: 92,
          fontWeight: 900,
        }}
      >
        G
      </div>
    ),
    { width: 180, height: 180 }
  );
}