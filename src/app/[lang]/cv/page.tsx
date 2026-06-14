import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import {
  awards,
  education,
  experience,
  languages,
  profile,
  skills,
  type TimelineItem,
} from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { DocIcon } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  return { title: getDictionary(locale).cv.title };
}

export default async function CvPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <PageHeader title={dict.cv.title} />
        {profile.cvPdf && (
          <a
            href={profile.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-1 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
          >
            <DocIcon width={16} height={16} />
            {dict.common.downloadCv}
          </a>
        )}
      </div>

      <div className="mt-10 space-y-12">
        {/* Formation */}
        <Section title={dict.cv.education}>
          <Timeline items={education} locale={locale} />
        </Section>

        {/* Expérience */}
        <Section title={dict.cv.experience}>
          <Timeline items={experience} locale={locale} />
        </Section>

        {/* Compétences */}
        <Section title={dict.cv.skills}>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((group, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-2">
                  {t(group.category, locale)}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-surface-2 px-2.5 py-1 text-sm font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Distinctions */}
        {awards.length > 0 && (
          <Section title={dict.cv.awards}>
            <ul className="space-y-3">
              {awards.map((award, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 font-mono text-sm text-muted-2">
                    {award.year}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">
                      {t(award.title, locale)}
                    </p>
                    {award.detail && (
                      <p className="text-sm text-muted">{t(award.detail, locale)}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Langues */}
        <Section title={dict.cv.languages}>
          <div className="flex flex-wrap gap-3">
            {languages.map((lng, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface px-4 py-3"
              >
                <p className="font-medium text-foreground">{t(lng.name, locale)}</p>
                <p className="text-sm text-muted">{t(lng.level, locale)}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-5 font-serif text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Timeline({ items, locale }: { items: TimelineItem[]; locale: Locale }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {items.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
          <p className="font-mono text-xs text-muted-2">{item.period}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {t(item.title, locale)}
          </h3>
          <p className="text-sm font-medium text-accent">
            {item.organization}
            {item.location ? ` · ${item.location}` : ""}
          </p>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(item.description, locale)}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
