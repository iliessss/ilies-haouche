import Link from "next/link";
import Image from "next/image";
import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { conferences, profile, publications } from "@/content/site";
import SocialLinks from "@/components/SocialLinks";
import { renderBold } from "@/lib/markup";
import { ArrowRightIcon, DocIcon, LocationIcon, MailIcon } from "@/components/Icons";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const dict = getDictionary(locale);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const recentPubs = [...publications].sort((a, b) => b.year - a.year).slice(0, 3);
  const recentTalks = conferences.slice(0, 3); // déjà du plus récent au plus ancien

  return (
    <div>
      {/* ─── BANNIÈRE ─── */}
      {profile.banner && (
        <div className="relative h-48 w-full overflow-hidden sm:h-60 md:h-72">
          <Image
            src={profile.banner}
            alt=""
            fill
            priority
            className="object-cover object-[50%_42%]"
            sizes="100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* ─── HERO ─── */}
        <section
          className={`flex flex-col items-center gap-6 md:flex-row md:items-end md:gap-8 ${
            profile.banner ? "-mt-16 sm:-mt-20" : "pt-14 sm:pt-20"
          } pb-10`}
        >
          <div className="animate-fade-up shrink-0">
            {profile.photo ? (
              <Image
                src={profile.photo}
                alt={profile.name}
                width={176}
                height={176}
                className="h-36 w-36 rounded-2xl object-cover object-[40%_38%] shadow-lg ring-4 ring-background sm:h-44 sm:w-44"
                priority
              />
            ) : (
              <div className="flex h-36 w-36 items-center justify-center rounded-2xl bg-accent text-4xl font-bold text-white shadow-lg ring-4 ring-background sm:h-44 sm:w-44">
                {initials}
              </div>
            )}
          </div>

          <div className="animate-fade-up pb-1 text-center md:text-left">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              {t(profile.role, locale)}
            </p>
            <h1 className="mt-1 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted">
              <LocationIcon width={16} height={16} />
              {t(profile.affiliation, locale)}
            </p>
          </div>
        </section>

        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {t(profile.tagline, locale)}
        </p>

        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <a
            href={profile.links.email}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            <MailIcon width={16} height={16} />
            {dict.home.contactCta}
          </a>
          {profile.cvPdf && (
            <a
              href={profile.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
            >
              <DocIcon width={16} height={16} />
              {dict.common.downloadCv}
            </a>
          )}
          <SocialLinks size="sm" className="sm:ml-1" />
        </div>

        {/* ─── À PROPOS ─── */}
        <section className="mt-14 border-t border-border pt-12">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {dict.home.aboutTitle}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
            {profile.bio[locale].map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* ─── AXES DE RECHERCHE ─── */}
        <section className="border-t border-border py-12">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {dict.home.researchTitle}
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.researchInterests.map((interest, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface p-4 text-sm font-medium text-foreground transition-colors hover:border-accent"
              >
                {t(interest, locale)}
              </div>
            ))}
          </div>
        </section>

        {/* ─── PUBLICATIONS RÉCENTES ─── */}
        {recentPubs.length > 0 && (
          <section className="border-t border-border py-12">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                {dict.home.latestPublications}
              </h2>
              <Link
                href={`/${locale}/publications`}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all hover:gap-2"
              >
                {dict.common.viewAll}
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
            <ul className="mt-6 space-y-5">
              {recentPubs.map((pub, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 font-mono text-sm text-muted-2">
                    {pub.year}
                  </span>
                  <div>
                    <p className="font-medium leading-snug text-foreground">
                      {t(pub.title, locale)}
                    </p>
                    <p className="mt-1 text-sm text-muted">{renderBold(pub.authors)}</p>
                    <p className="text-sm italic text-muted-2">{t(pub.venue, locale)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ─── COMMUNICATIONS RÉCENTES ─── */}
        {recentTalks.length > 0 && (
          <section className="border-t border-border py-12">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                {dict.home.latestTalks}
              </h2>
              <Link
                href={`/${locale}/conferences`}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all hover:gap-2"
              >
                {dict.common.viewAll}
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
            <ul className="mt-6 space-y-5">
              {recentTalks.map((talk, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 font-mono text-sm text-muted-2">
                    {talk.date}
                  </span>
                  <div>
                    <p className="font-medium leading-snug text-foreground">
                      {t(talk.title, locale)}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {talk.event} · {talk.location}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
