import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "rgb(225,29,46)",
          color: "#ffffff",
          fontSize: 34,
          fontWeight: 800,
        }}
      >
        G
      </div>
    ),
    size
  );
}