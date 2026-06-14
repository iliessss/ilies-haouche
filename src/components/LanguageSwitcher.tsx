"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  // Remplace le segment de langue en tête de l'URL (/fr/... <-> /en/...)
  function pathFor(locale: Locale): string {
    const segments = pathname.split("/");
    if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = locale;
    } else {
      return `/${locale}`;
    }
    return segments.join("/") || `/${locale}`;
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-border p-0.5 text-sm font-medium">
      {locales.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={pathFor(locale)}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "rounded-md bg-accent px-2.5 py-1 text-white"
                : "rounded-md px-2.5 py-1 text-muted transition-colors hover:text-foreground"
            }
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
