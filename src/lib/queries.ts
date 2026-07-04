import { getSanityClient } from "./sanity";

export interface SanityGuide {
  _id: string;
  title: string;
  slug: { current: string };
  tag: string;
  tagColor: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
  body: unknown[];
}

export interface SanityGuideCard {
  _id: string;
  title: string;
  slug: { current: string };
  tag: string;
  tagColor: string;
  excerpt: string;
  readTime: string;
  publishedAt: string;
}

const guideCardFields = `
  _id,
  title,
  slug,
  tag,
  tagColor,
  excerpt,
  readTime,
  publishedAt
`;

export async function getAllGuides(): Promise<SanityGuideCard[]> {
  const client = getSanityClient();
  if (!client) return [];
  return client.fetch(
    `*[_type == "guide"] | order(publishedAt desc) { ${guideCardFields} }`
  );
}

export async function getGuideBySlug(slug: string): Promise<SanityGuide | null> {
  const client = getSanityClient();
  if (!client) return null;
  return client.fetch(
    `*[_type == "guide" && slug.current == $slug][0] { ${guideCardFields}, body }`,
    { slug }
  );
}

export async function getGuideSlugs(): Promise<{ slug: string }[]> {
  const client = getSanityClient();
  if (!client) return [];
  const results = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "guide"]{ slug }`
  );
  return results.map((r) => ({ slug: r.slug.current }));
}
