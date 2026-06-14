import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const base = "https://ilies-haouche.com";
const paths = ["", "/publications", "/conferences", "/projects", "/teaching", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const p of paths) {
      entries.push({
        url: `${base}/${locale}${p}`,
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
