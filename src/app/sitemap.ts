import type { MetadataRoute } from "next";
import { getGuideSlugs } from "@/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let guideEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getGuideSlugs();
    guideEntries = slugs.map((s) => ({
      url: `${siteUrl}/guides/${s.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // Sanity not configured — sitemap still valid without guide entries
  }

  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/guides`, changeFrequency: "weekly", priority: 0.8 },
    ...guideEntries,
  ];
}
