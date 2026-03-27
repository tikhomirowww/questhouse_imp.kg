import { createSocialImage, socialImageContentType, socialImageSize } from "@/lib/social-image";

export const alt = "Квест Хаус ИМП — квесты в Бишкеке";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function Image() {
  return createSocialImage({
    eyebrow: "Квесты в Бишкеке",
    title: "Квест Хаус ИМП",
    description:
      "Gravity Falls и Франкенштейн: атмосферные квесты с декорациями, актёрами и онлайн-бронированием.",
    accent: "#dc2626",
    accentSoft: "#7c3aed",
    badge: "IMP",
  });
}
