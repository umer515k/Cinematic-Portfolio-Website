import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0D0B08",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Grain texture simulation via radial gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, #1a1208 0%, #0d0b08 100%)",
          }}
        />
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 80,
            right: 80,
            height: 1,
            background: "rgba(200,150,62,0.3)",
          }}
        />
        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            right: 80,
            height: 1,
            background: "rgba(200,150,62,0.3)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(200,150,62,0.7)",
            }}
          >
            Portfolio
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 300,
              color: "#E8E0D0",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            UMER KHALIL
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(232,224,208,0.3)",
            }}
          >
            Engineer // Automator
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
