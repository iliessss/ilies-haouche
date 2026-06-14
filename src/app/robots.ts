import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ilies-haouche.com/sitemap.xml",
    host: "https://ilies-haouche.com",
  };
}
