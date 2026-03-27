import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Квест Хаус ИМП",
    short_name: "ИМП",
    description:
      "Квест Хаус ИМП в Бишкеке: Gravity Falls и Франкенштейн с онлайн-бронированием.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
      {
        src: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  };
}
