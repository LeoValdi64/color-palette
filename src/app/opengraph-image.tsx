import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Chromatic - Free Color Palette Generator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  // Generate 5 colors for the preview
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
        }}
      >
        {/* Color strips */}
        <div style={{ display: "flex", flex: 1, width: "100%" }}>
          {colors.map((color, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                backgroundColor: color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ))}
        </div>

        {/* Bottom bar with branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 48px",
            backgroundColor: "#0a0a0a",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 48,
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              Chromatic
            </span>
            <span
              style={{
                fontSize: 24,
                color: "#a3a3a3",
              }}
            >
              Free Color Palette Generator
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
            }}
          >
            {colors.map((color, i) => (
              <div
                key={i}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
