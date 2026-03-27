import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://questhouse-imp.kg"),
  title: {
    default: "Квест Хаус ИМП — ТОП Квест в Бишкеке | Хоррор и Логический квест",
    template: "%s | Квест Хаус ИМП",
  },
  description:
    "Лучший квест-хаус в Бишкеке. Два уникальных квеста: Gravity Falls (логический) и Франкенштейн (хоррор). Профессиональные актёры. Ул. Байтик Баатыра 36/1. Звоните: +996 555 118 119",
  keywords: [
    "квест бишкек",
    "квест хаус",
    "хоррор квест",
    "логический квест",
    "квест с актёрами",
    "детский квест",
    "квест хаус имп",
    "escape room bishkek",
    "gravity falls quest",
    "frankenstein quest",
    "квест байтик баатыра",
    "квесты бишкек",
  ],
  authors: [{ name: "Квест Хаус ИМП" }],
  creator: "Квест Хаус ИМП",
  publisher: "Квест Хаус ИМП",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_KG",
    url: "https://questhouse-imp.kg",
    siteName: "Квест Хаус ИМП",
    title: "Квест Хаус ИМП — ТОП Квест в Бишкеке",
    description:
      "Лучший квест-хаус в Бишкеке. Gravity Falls и Франкенштейн. Профессиональные актёры, уникальные декорации.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Квест Хаус ИМП — ТОП Квест в Бишкеке",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Квест Хаус ИМП — ТОП Квест в Бишкеке",
    description: "Лучший квест-хаус в Бишкеке. Gravity Falls и Франкенштейн.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Квест Хаус ИМП",
  alternateName: "Quest House IMP",
  description:
    "Лучший квест-хаус в Бишкеке. Два уникальных квеста: Gravity Falls (логический) и Франкенштейн (хоррор).",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Байтик Баатыра 36/1",
    addressLocality: "Бишкек",
    addressCountry: "KG",
  },
  telephone: ["+996555118119", "+996707118119"],
  url: "https://questhouse-imp.kg",
  sameAs: ["https://www.instagram.com/questhouse_imp.kg"],
  openingHours: "Mo-Su 10:00-22:00",
  priceRange: "$$",
  image: "/og-image.jpg",
  hasMap: "https://maps.google.com/?q=Байтик+Баатыра+36/1+Бишкек",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "2900",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
