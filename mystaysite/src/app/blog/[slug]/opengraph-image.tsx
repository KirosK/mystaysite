import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

export const alt = "MyStaySite Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const categoryColors: Record<string, string> = {
  SEO: "#3B82F6",
  Marketing: "#8B5CF6",
  "Case Studies": "#10B981",
  Tips: "#F59E0B",
};

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? "MyStaySite Blog";
  const category = post?.frontmatter.category ?? "";
  const catColor = categoryColors[category] || "#F57C51";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${catColor}22 0%, transparent 70%)`,
            display: "flex",
          }}
        />

        {/* Top: category + brand */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {category && (
            <div
              style={{
                background: `${catColor}22`,
                border: `1px solid ${catColor}44`,
                borderRadius: 10,
                padding: "8px 20px",
                display: "flex",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  color: catColor,
                  fontWeight: 700,
                }}
              >
                {category}
              </span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>
              my
            </span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#3B82F6" }}>
              stay
            </span>
            <span style={{ fontSize: 24, fontWeight: 800, color: "#FFFFFF" }}>
              site
            </span>
          </div>
        </div>

        {/* Center: title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? 44 : 52,
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              maxWidth: 900,
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: author + blog */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#1a1a2e",
              border: "2px solid #3B82F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            K
          </div>
          <span style={{ fontSize: 18, color: "#94A3B8" }}>
            Κύρος | MyStaySite Blog
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
