import { notFound } from "next/navigation";
import { getQuestBySlug } from "@/lib/site-config";
import {
  createSocialImage,
  socialImageContentType,
  socialImageSize,
} from "@/lib/social-image";

export const size = socialImageSize;
export const contentType = socialImageContentType;
export const alt = "Квест Квест Хаус ИМП";

type QuestImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Image({ params }: QuestImageProps) {
  const { slug } = await params;
  const quest = getQuestBySlug(slug);

  if (!quest) {
    notFound();
  }

  return createSocialImage({
    eyebrow: quest.typeLabel,
    title: quest.nameRu,
    description: quest.description,
    accent: quest.accent,
    accentSoft: quest.accentSoft,
    badge: quest.emoji,
  });
}
