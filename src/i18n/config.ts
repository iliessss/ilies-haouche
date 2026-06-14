export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Type utilitaire pour une chaîne disponible dans les deux langues. */
export type Localized = Record<Locale, string>;

/** Renvoie la valeur dans la langue demandée (avec repli sur le français). */
export function t(value: Localized, locale: Locale): string {
  return value[locale] ?? value[defaultLocale];
}
