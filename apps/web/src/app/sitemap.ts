import { brands } from "@/content/brands";
import { locales } from "@/i18n/config";
import { getNewsPosts } from "@/lib/wordpress";
import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.spray166.com";

const staticPaths = [
  "",
  "/shop",
  "/shop/owl-goggle",
  "/skatepark",
  "/skatepark/facility",
  "/skatepark/prices",
  "/skatepark/calendar",
  "/skatepark/first-timers",
  "/skatepark/rules",
  "/school",
  "/school/lessons",
  "/school/booking",
  "/school/camp",
  "/school/instructors",
  "/maintenance",
  "/maintenance/request",
  "/brands",
  "/news",
  "/about/access",
  "/about/story",
  "/about/staff",
  "/about/calendar",
  "/legal/privacy",
  "/legal/tokusho",
  "/legal/company",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.7,
      });
    }

    for (const brand of brands) {
      entries.push({
        url: `${baseUrl}/${locale}/brands/${brand.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  try {
    const posts = await getNewsPosts(100);
    for (const post of posts) {
      for (const locale of locales) {
        entries.push({
          url: `${baseUrl}/${locale}/news/${post.slug}`,
          lastModified: post.date ? new Date(post.date) : new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        });
      }
    }
  } catch {
    // WP unset — static only
  }

  return entries;
}
