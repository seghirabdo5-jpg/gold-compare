import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { getAllStores } from "@/lib/stores";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/gold-calculator",
    "/compare",
    "/near-me",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
    "/gold-price-sources",
  ].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() }));

  const storePages = getAllStores().map((s) => ({
    url: `${siteConfig.url}/stores/${s.slug}`,
    lastModified: new Date(),
  }));

  const blogPages = getAllPosts().map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: p.date,
  }));

  return [...staticPages, ...storePages, ...blogPages];
}
