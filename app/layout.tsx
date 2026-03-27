import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import HashScrollHandler from "@/components/HashScrollHandler";
import {
  QUEST_SLUGS,
  QUESTS,
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_INSTAGRAM,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_PHONE,
  SITE_PHONE_ALT,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: "%s | Квест Хаус ИМП",
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Квест Хаус ИМП" }],
  creator: "Квест Хаус ИМП",
  publisher: "Квест Хаус ИМП",
  category: "entertainment",
  formatDetection: {
    telephone: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "ru_KG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      alternateName: "Quest House IMP",
      description: SITE_DESCRIPTION,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_ADDRESS,
        addressLocality: "Бишкек",
        addressCountry: "KG",
      },
      telephone: [SITE_PHONE, SITE_PHONE_ALT],
      url: SITE_URL,
      sameAs: [SITE_INSTAGRAM],
      openingHours: "Mo-Su 10:00-22:00",
      priceRange: "$$",
      image: `${SITE_URL}/opengraph-image`,
      hasMap: "https://maps.google.com/?q=Байтик+Баатыра+36/1+Бишкек",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "2900",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Квесты Квест Хаус ИМП",
        itemListElement: QUEST_SLUGS.map((slug) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: QUESTS[slug].nameRu,
            description: QUESTS[slug].seoDescription,
            url: `${SITE_URL}/quests/${slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "ru-KG",
    },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: [SITE_INSTAGRAM],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <Providers>
          <HashScrollHandler />
          {children}
        </Providers>
      </body>
    </html>
  );
}
