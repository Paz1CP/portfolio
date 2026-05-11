import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

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
          padding: "64px",
          background:
            "radial-gradient(circle at 75% 25%, rgba(201,150,46,0.35), transparent 36%), linear-gradient(145deg, #0b0907 0%, #15110d 70%, #1f1812 100%)",
          color: "#f3e7d2",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#e7c878",
          }}
        >
          Mobile Product Engineer - Flutter Developer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              fontWeight: 700,
              maxWidth: 900,
            }}
          >
            Christopher Paz Leon
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.2,
              color: "rgba(243, 231, 210, 0.85)",
            }}
          >
            Design. Build. Ship.
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(201,150,46,0.75), rgba(243,231,210,0.3), transparent)",
          }}
        />
      </div>
    ),
    size
  );
}
