import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingForm from "@/components/BookingForm";
import BookingPageClient from "@/components/BookingPageClient";

export const metadata: Metadata = {
  title: "Забронировать квест — Онлайн бронирование",
  description:
    "Забронируйте квест онлайн. Выберите Gravity Falls или Франкенштейн, удобную дату и время. Квест Хаус ИМП, Бишкек.",
  alternates: {
    canonical: "https://questhouse-imp.kg/booking",
  },
};

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
