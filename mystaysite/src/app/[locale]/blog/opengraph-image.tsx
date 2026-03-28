import { ImageResponse } from "next/og";

export const alt = "MyStaySite Blog — Συμβουλές για Τουριστικά Καταλύματα";
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
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,124,81,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "#3B82F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
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
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              my
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "#3B82F6",
              }}
            >
              stay
            </span>
            <span
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: "#FFFFFF",
              }}
            >
              site
            </span>
          </div>
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.2,
            marginBottom: 20,
            display: "flex",
          }}
        >
          Blog
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: 700,
            display: "flex",
          }}
        >
          Συμβουλές για Τουριστικά Καταλύματα
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 16,
          }}
        >
          {["SEO", "Marketing", "Tips", "Case Studies"].map((cat) => (
            <div
              key={cat}
              style={{
                background: "rgba(245,124,81,0.1)",
                border: "1px solid rgba(245,124,81,0.3)",
                borderRadius: 10,
                padding: "8px 20px",
                display: "flex",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  color: "#F57C51",
                  fontWeight: 600,
                }}
              >
                {cat}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
