import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  getQuestBookingPath,
  getQuestBySlug,
  getQuestMetadata,
  QUEST_SLUGS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";

type QuestPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return QUEST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: QuestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const quest = getQuestBySlug(slug);

  if (!quest) {
    return {};
  }

  return getQuestMetadata(quest.slug);
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { slug } = await params;
  const quest = getQuestBySlug(slug);

  if (!quest) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${quest.nameRu} — ${quest.typeLabel}`,
    description: quest.seoDescription,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Бишкек",
    audience: {
      "@type": "Audience",
      audienceType: quest.audience,
    },
    url: `${SITE_URL}/quests/${quest.slug}`,
    category: quest.typeLabel,
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0a0a0a]">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -right-24 top-12 h-72 w-72 rounded-full blur-3xl"
          style={{ background: quest.accent, opacity: 0.22 }}
        />
        <div
          className="absolute -left-16 bottom-0 h-64 w-64 rounded-full blur-3xl"
          style={{ background: quest.accentSoft, opacity: 0.18 }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-18 sm:px-6 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span
              className="mb-4 inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]"
              style={{
                borderColor: `${quest.accent}80`,
                color: quest.accent,
                background: `${quest.accent}14`,
              }}
            >
              {quest.typeLabel}
            </span>
            <h1
              className="text-4xl font-black text-white sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {quest.nameRu}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#d4d4d8] sm:text-lg">
              {quest.seoDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#e4e4e7]">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Длительность: {quest.duration}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Возраст: {quest.ageRating}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Для кого: {quest.audience}
              </span>
            </div>
          </div>

          <div className="flex w-full max-w-sm flex-col gap-3">
            <Link
              href={getQuestBookingPath(quest.slug)}
              className="flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.01]"
              style={{
                background: `linear-gradient(135deg, ${quest.accentSoft}, ${quest.accent})`,
                boxShadow: `0 16px 40px ${quest.accent}35`,
              }}
            >
              Забронировать квест
            </Link>
            <Link
              href="/#quests"
              className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-white"
            >
              Вернуться к списку квестов
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2
            className="text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            О квесте
          </h2>
          <p className="mt-4 text-base leading-7 text-[#d4d4d8]">
            {quest.description}
          </p>
          <p className="mt-4 text-base leading-7 text-[#d4d4d8]">
            Квест находится в Бишкеке по адресу ул. Байтик Баатыра 36/1 и
            подходит для тех, кто ищет сильные эмоции, необычный досуг и
            качественное живое приключение с глубоким погружением в атмосферу.
          </p>
        </article>

        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2
            className="text-2xl font-bold text-white sm:text-3xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Почему выбирают этот квест
          </h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-[#d4d4d8] sm:text-base">
            {quest.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <span
                  className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: quest.accent }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
