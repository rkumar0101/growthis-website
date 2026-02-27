// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://growthis.in";

  const routes = [
    "",
    "/services",
    "/solutions",
    "/process",
    "/case-studies",
    "/about",
    "/contact",
    "/tools",
    "/tools/website-roi",
    "/tools/landing-page-score",
    "/tools/marketing-budget",
    "/legal",
    "/legal/terms",
    "/legal/privacy",
    "/careers",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}