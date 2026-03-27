import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Забронировать квест — Онлайн бронирование",
  description:
    "Забронируйте квест онлайн. Выберите Gravity Falls или Франкенштейн, удобную дату и время. Квест Хаус ИМП, Бишкек.",
  alternates: {
    canonical: "https://questhouse-imp.kg/booking",
  },
};

function BookingFormFallback() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#7c3aed", borderTopColor: "transparent" }}
        />
        <span className="text-[#71717a] text-sm">Загрузка...</span>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(220,38,38,0.08) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#71717a] hover:text-white text-sm transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          На главную
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm"
              style={{
                background: "linear-gradient(135deg, #dc2626, #7c3aed)",
                fontFamily: "'Cinzel', serif",
              }}
            >
              ИМП
            </div>
            <h1
              className="text-2xl sm:text-3xl font-black text-white"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              БРОНИРОВАНИЕ
            </h1>
          </div>
          <p className="text-[#a1a1aa] text-sm">
            Заполните форму ниже. После подтверждения мы свяжемся с вами.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            background: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Card top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #7c3aed, #dc2626, transparent)",
            }}
          />

          <Suspense fallback={<BookingFormFallback />}>
            <BookingForm />
          </Suspense>
        </div>

        {/* Alternative contact */}
        <div
          className="mt-6 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[#71717a] text-sm text-center sm:text-left">
            Предпочитаете позвонить? Мы всегда рады помочь
          </p>
          <div className="flex gap-2 shrink-0">
            <a
              href="tel:+996555118119"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
            >
              <Phone className="w-3.5 h-3.5" />
              Позвонить
            </a>
            <a
              href="https://wa.me/996555118119"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
              style={{ background: "rgba(37,211,102,0.2)", border: "1px solid rgba(37,211,102,0.3)" }}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
