import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import QuestsSection from "@/components/QuestCard";
import HowItWorks from "@/components/HowItWorks";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Квест Хаус ИМП — ТОП Квест в Бишкеке | Хоррор и Логический квест",
  description:
    "Лучший квест-хаус в Бишкеке. Два уникальных квеста: Gravity Falls (логический) и Франкенштейн (хоррор). Профессиональные актёры. Ул. Байтик Баатыра 36/1. Звоните: +996 555 118 119",
  alternates: {
    canonical: "https://questhouse-imp.kg",
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <QuestsSection />
      <HowItWorks />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
