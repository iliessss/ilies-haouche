import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionary";
import { conferences, type TalkType } from "@/content/site";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  return { title: getDictionary(locale).conferences.title };
}

const typeLabelKey: Record<TalkType, keyof Dictionary["conferences"]> = {
  talk: "typeTalk",
  poster: "typePoster",
  invited: "typeInvited",
  seminar: "typeSeminar",
};

const typeStyles: Record<TalkType, string> = {
  talk: "bg-accent-soft text-accent border-accent/30",
  invited: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  poster: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-900",
  seminar: "bg-surface-2 text-muted border-border",
};

export default async function ConferencesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const dict = getDictionary(locale);

  const sorted = conferences; // affiché dans l'ordre du fichier (plus récent en premier)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader
        title={dict.conferences.title}
        subtitle={dict.conferences.subtitle}
      />

      {sorted.length > 0 ? (
        <ol className="mt-8 space-y-5">
          {sorted.map((talk, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:gap-5"
            >
              <span className="shrink-0 font-mono text-sm text-muted-2 sm:w-20 sm:pt-1">
                {talk.date}
              </span>
              <div className="flex-1">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeStyles[talk.type]}`}
                >
                  {dict.conferences[typeLabelKey[talk.type]]}
                </span>
                <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-foreground">
                  {t(talk.title, locale)}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {talk.event} · {talk.location}
                </p>
                {talk.links && Object.values(talk.links).some(Boolean) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {talk.links.slides && (
                      <LinkPill href={talk.links.slides} label="Slides" />
                    )}
                    {talk.links.poster && (
                      <LinkPill href={talk.links.poster} label="Poster" />
                    )}
                    {talk.links.abstract && (
                      <LinkPill href={talk.links.abstract} label="Abstract" />
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-8 text-muted">{dict.conferences.empty}</p>
      )}
    </div>
  );
}

function LinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md border border-border px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}
