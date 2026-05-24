import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Robertino Barbuto · Dev freelance · Buenos Aires";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 80% at 0% 0%, #ff5320 0%, #f04000 55%, #c63300 100%)",
          color: "#fff7ed",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span>robertinobarbuto.com</span>
          <span>buenos aires · 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.75,
            }}
          >
            freelance · ecommerce · agentic ai
          </div>
          <div
            style={{
              fontSize: 108,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
            }}
          >
            Construyo software web y
            <br /> sistemas agénticos para LATAM.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <span>Robertino Barbuto · @rober8b</span>
          <span>next.js · mastra · ai gateway</span>
        </div>
      </div>
    ),
    size,
  );
}
