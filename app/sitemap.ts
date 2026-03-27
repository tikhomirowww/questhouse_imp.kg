import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://questhouse-imp.kg";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];
}
