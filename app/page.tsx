import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import QuestsSection from "@/components/QuestCard";
import PricingSection from "@/components/PricingSection";
import HowItWorks from "@/components/HowItWorks";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutSection />
      <QuestsSection />
      <PricingSection />
      <HowItWorks />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
