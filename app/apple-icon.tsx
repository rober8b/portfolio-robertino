import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          background: "linear-gradient(135deg, #ff5320 0%, #c63300 100%)",
          color: "#fff7ed",
          fontSize: 108,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        rb
      </div>
    ),
    size,
  );
}
