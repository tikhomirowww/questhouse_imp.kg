import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export const socialImageContentType = "image/png";

type SocialImageOptions = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  badge: string;
};

export function createSocialImage({
  eyebrow,
  title,
  description,
  accent,
  accentSoft,
  badge,
}: SocialImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 28%), linear-gradient(135deg, #09090b 0%, #111827 55%, #0f172a 100%)",
          color: "white",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
            backgroundSize: "30px 30px",
            opacity: 0.24,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: accent,
            opacity: 0.28,
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -90,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: accentSoft,
            opacity: 0.24,
            filter: "blur(72px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "54px 62px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "12px 18px",
                borderRadius: 9999,
                fontSize: 20,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "rgba(255,255,255,0.08)",
                border: `1px solid ${accent}`,
                color: "#f8fafc",
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 116,
                height: 116,
                borderRadius: 28,
                background: `linear-gradient(135deg, ${accentSoft}, ${accent})`,
                boxShadow: `0 24px 60px ${accent}55`,
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              {badge}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              maxWidth: 860,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.35,
                color: "#d4d4d8",
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "#e4e4e7",
            }}
          >
            <div style={{ display: "flex" }}>Квест Хаус ИМП • Бишкек</div>
            <div style={{ display: "flex", color: "#f59e0b" }}>
              questhouse-imp.kg
            </div>
          </div>
        </div>
      </div>
    ),
    socialImageSize
  );
}
