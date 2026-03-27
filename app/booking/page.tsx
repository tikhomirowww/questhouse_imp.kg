import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingForm from "@/components/BookingForm";
import BookingPageClient from "@/components/BookingPageClient";
import {
  getQuestBySlug,
  getQuestShareImagePath,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site-config";

type BookingPageMetadataProps = {
  searchParams: Promise<{
    quest?: string | string[];
  }>;
};

export async function generateMetadata({
  searchParams,
}: BookingPageMetadataProps): Promise<Metadata> {
  const params = await searchParams;
  const questParam = Array.isArray(params.quest) ? params.quest[0] : params.quest;
  const quest = questParam ? getQuestBySlug(questParam) : undefined;

  if (!quest) {
    return {
      title: "Забронировать квест — Онлайн бронирование",
      description:
        "Забронируйте квест онлайн. Выберите Gravity Falls или Франкенштейн, удобную дату и время. Квест Хаус ИМП, Бишкек.",
      alternates: {
        canonical: `${SITE_URL}/booking`,
      },
    };
  }

  const url = `${SITE_URL}/booking?quest=${quest.slug}`;
  const description = `Онлайн-бронирование квеста ${quest.nameRu} в Квест Хаус ИМП. ${quest.shortLabel}, ${quest.duration}, возраст ${quest.ageRating}.`;

  return {
    title: `Забронировать ${quest.nameRu} — онлайн`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "ru_KG",
      url,
      siteName: SITE_NAME,
      title: `Забронировать ${quest.nameRu} — Квест Хаус ИМП`,
      description,
      images: [
        {
          url: getQuestShareImagePath(quest.slug),
          width: 1200,
          height: 630,
          alt: `${quest.nameRu} — ${quest.typeLabel}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Забронировать ${quest.nameRu}`,
      description,
      images: [getQuestShareImagePath(quest.slug)],
    },
  };
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <BookingPageClient>
        <Suspense fallback={<BookingFormFallback />}>
          <BookingForm />
        </Suspense>
      </BookingPageClient>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

function BookingFormFallback() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#7c3aed", borderTopColor: "transparent" }}
        />
      </div>
    </div>
  );
}
