import type { Metadata } from "next";

export const SITE_URL = "https://questhouse-imp.kg";
export const SITE_NAME = "Квест Хаус ИМП";
export const SITE_TITLE =
  "Квест Хаус ИМП — ТОП квесты в Бишкеке | Хоррор и логические квесты";
export const SITE_DESCRIPTION =
  "Квест Хаус ИМП в Бишкеке: Gravity Falls для детей и семей, Франкенштейн для любителей хоррора. Профессиональные актёры, атмосферные декорации, онлайн-бронирование.";
export const SITE_PHONE = "+996 555 118 119";
export const SITE_PHONE_ALT = "+996 707 118 119";
export const SITE_ADDRESS = "г. Бишкек, ул. Байтик Баатыра 36/1";
export const SITE_INSTAGRAM = "https://www.instagram.com/questhouse_imp.kg";

export const SITE_KEYWORDS = [
  "квест бишкек",
  "квесты бишкек",
  "квест хаус бишкек",
  "квест хаус имп",
  "квест с актерами бишкек",
  "хоррор квест бишкек",
  "логический квест бишкек",
  "детский квест бишкек",
  "escape room bishkek",
  "gravity falls bishkek",
  "frankenstein quest bishkek",
];

export type QuestSlug = "gravity-falls" | "frankenstein";

export type QuestDetails = {
  slug: QuestSlug;
  name: string;
  nameRu: string;
  typeLabel: string;
  shortLabel: string;
  audience: string;
  duration: string;
  ageRating: string;
  emoji: string;
  accent: string;
  accentSoft: string;
  description: string;
  seoDescription: string;
  features: string[];
  keywords: string[];
};

export const QUESTS: Record<QuestSlug, QuestDetails> = {
  "gravity-falls": {
    slug: "gravity-falls",
    name: "Gravity Falls",
    nameRu: "Гравити Фолс",
    typeLabel: "Логический квест",
    shortLabel: "Семейный и детский квест",
    audience: "Дети от 6 лет, семьи и взрослые",
    duration: "1–1.5 часа",
    ageRating: "6+",
    emoji: "GF",
    accent: "#7c3aed",
    accentSoft: "#4f46e5",
    description:
      "Погрузитесь в тайны вселенной Гравити Фолс: загадки, механизмы, декорации и актёры создают настоящее приключение для детей и взрослых.",
    seoDescription:
      "Gravity Falls в Квест Хаус ИМП — логический квест в Бишкеке для детей от 6 лет, семей и компаний друзей. Уникальная электроника, незабываемые декорации, актёры и аниматоры.",
    features: [
      "Уникальная электроника и механизмы",
      "Незабываемые декорации",
      "Профессиональные актёры и аниматоры",
      "Подходит для дней рождения",
      "Идеален для детей от 6 лет",
      "Подходит и для взрослых компаний",
    ],
    keywords: [
      "gravity falls квест бишкек",
      "гравити фолс квест бишкек",
      "детский квест бишкек",
      "семейный квест бишкек",
    ],
  },
  frankenstein: {
    slug: "frankenstein",
    name: "Франкенштейн",
    nameRu: "Франкенштейн",
    typeLabel: "Хоррор квест",
    shortLabel: "Страшный квест с актёрами",
    audience: "Подростки 16+ и взрослые",
    duration: "~1 час",
    ageRating: "16+",
    emoji: "FR",
    accent: "#dc2626",
    accentSoft: "#991b1b",
    description:
      "Мрачная готическая атмосфера, антиквариат, большая локация и профессиональные актёры делают Франкенштейна одним из самых запоминающихся хоррор-квестов в Бишкеке.",
    seoDescription:
      "Франкенштейн в Квест Хаус ИМП — хоррор квест в Бишкеке для подростков 16+ и взрослых. Атмосфера настоящего ужаса, профессиональные актёры, антиквариат и головоломки.",
    features: [
      "Безграничная локация",
      "Оригинальный антиквариат и декорации",
      "Профессиональные актёры",
      "Сильная хоррор-атмосфера",
      "Интересные головоломки",
      "Незабываемые впечатления для компании",
    ],
    keywords: [
      "франкенштейн квест бишкек",
      "хоррор квест бишкек",
      "страшный квест бишкек",
      "квест с актерами бишкек",
    ],
  },
};

export const QUEST_SLUGS = Object.keys(QUESTS) as QuestSlug[];

export function getQuestBySlug(slug: string): QuestDetails | undefined {
  return QUESTS[slug as QuestSlug];
}

export function getQuestPath(slug: QuestSlug) {
  return `/quests/${slug}`;
}

export function getQuestBookingPath(slug: QuestSlug) {
  return `/booking?quest=${slug}`;
}

export function getQuestShareImagePath(slug: QuestSlug) {
  return `${SITE_URL}${getQuestPath(slug)}/opengraph-image`;
}

export function getQuestMetadata(slug: QuestSlug): Metadata {
  const quest = QUESTS[slug];
  const url = `${SITE_URL}${getQuestPath(slug)}`;

  return {
    title: `${quest.nameRu} — ${quest.typeLabel} в Бишкеке`,
    description: quest.seoDescription,
    keywords: [...SITE_KEYWORDS, ...quest.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "ru_KG",
      url,
      siteName: SITE_NAME,
      title: `${quest.nameRu} — ${quest.typeLabel} | Квест Хаус ИМП`,
      description: quest.seoDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${quest.nameRu} — ${quest.typeLabel}`,
      description: quest.seoDescription,
    },
  };
}
