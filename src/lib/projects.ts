import fs from "node:fs";
import path from "node:path";
import { defaultLocale, type Locale } from "@/i18n/config";

const dir = path.join(process.cwd(), "src/content/projects");

/**
 * Lit le contenu Markdown d'un projet pour une langue donnée.
 * Fichier attendu : src/content/projects/<slug>.<locale>.md
 * Repli sur la langue par défaut si la traduction manque ; null si aucun fichier.
 */
export function getProjectContent(slug: string, locale: Locale): string | null {
  for (const loc of [locale, defaultLocale]) {
    try {
      return fs.readFileSync(path.join(dir, `${slug}.${loc}.md`), "utf8");
    } catch {
      // fichier absent — on essaie la langue suivante
    }
  }
  return null;
}
