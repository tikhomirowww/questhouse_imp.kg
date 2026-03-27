import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

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
          borderRadius: 36,
          background: "linear-gradient(135deg, #dc2626 0%, #7c3aed 100%)",
          color: "white",
          fontFamily: "Cinzel, Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "0.08em",
            color: "#ffffff",
          }}
        >
          IMP
        </div>
      </div>
    ),
    size
  );
}
