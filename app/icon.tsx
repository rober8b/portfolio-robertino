import { ImageResponse } from "next/og";

export const runtime = "edge";
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
          background: "linear-gradient(135deg, #ff5320 0%, #c63300 100%)",
          color: "#fff7ed",
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          fontFamily: "system-ui, sans-serif",
          borderRadius: 16,
        }}
      >
        rb
      </div>
    ),
    size,
  );
}
