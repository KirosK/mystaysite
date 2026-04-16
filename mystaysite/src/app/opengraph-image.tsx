import { ImageResponse } from "next/og";

export const alt = "MyStaySite - Websites για Ενοικιαζόμενα Δωμάτια";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative gradient circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "#3B82F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 8px 32px rgba(59,130,246,0.3)",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>

        {/* Brand name */}
        <div style={{ display: "flex", alignItems: "baseline", marginBottom: 20 }}>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#FFFFFF", letterSpacing: -1 }}>my</span>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#3B82F6", letterSpacing: -1 }}>stay</span>
          <span style={{ fontSize: 56, fontWeight: 800, color: "#FFFFFF", letterSpacing: -1 }}>site</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          Websites for vacation rentals & accommodations
        </div>

        {/* Price badge */}
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 12,
              padding: "10px 24px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18, color: "#60A5FA", fontWeight: 600 }}>3 Live Sites</span>
          </div>
          <div
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              borderRadius: 12,
              padding: "10px 24px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18, color: "#60A5FA", fontWeight: 600 }}>Get a Quote</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
