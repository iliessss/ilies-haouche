"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { profile } from "@/content/site";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { CloseIcon, MenuIcon } from "./Icons";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: dict.nav.home, exact: true },
    { href: `/${locale}/publications`, label: dict.nav.publications },
    { href: `/${locale}/conferences`, label: dict.nav.conferences },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/teaching`, label: dict.nav.teaching },
    { href: `/${locale}/cv`, label: dict.nav.cv },
  ];

  function isActive(href: string, exact?: boolean): boolean {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  // Initiales pour le logo
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-white">
            {initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        {/* Navigation bureau */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href, link.exact)
                  ? "rounded-lg px-3 py-2 text-sm font-medium text-accent"
                  : "rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <ThemeToggle label={dict.common.toggleTheme} />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted md:hidden"
            aria-label={dict.common.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-2 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  isActive(link.href, link.exact)
                    ? "rounded-lg px-3 py-2.5 text-sm font-medium text-accent"
                    : "rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-2 hover:text-foreground"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
