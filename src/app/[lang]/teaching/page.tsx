import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { courses } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { BuildingIcon } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  return { title: getDictionary(locale).teaching.title };
}

export default async function TeachingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const dict = getDictionary(locale);

  const sorted = courses; // affiché dans l'ordre du fichier (plus récent en premier)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader title={dict.teaching.title} subtitle={dict.teaching.subtitle} />

      {sorted.length > 0 ? (
        <ol className="mt-8 space-y-5">
          {sorted.map((course, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 sm:flex-row sm:gap-5"
            >
              <span className="shrink-0 font-mono text-sm text-muted-2 sm:w-28 sm:pt-1">
                {course.year}
              </span>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                  {t(course.title, locale)}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent">
                  {t(course.role, locale)}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                  <BuildingIcon width={15} height={15} />
                  {course.institution} · {t(course.level, locale)}
                  {course.hours && course.hours !== "—" ? ` · ${course.hours}` : ""}
                </p>
                {course.description && (
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(course.description, locale)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-8 text-muted">{dict.teaching.empty}</p>
      )}
    </div>
  );
}
