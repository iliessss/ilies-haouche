import Link from "next/link";
import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { projects } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { ArrowRightIcon } from "@/components/Icons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  return { title: getDictionary(locale).projects.title };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <PageHeader title={dict.projects.title} subtitle={dict.projects.subtitle} />

      {projects.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/${locale}/projects/${project.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
            >
              <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">
                {t(project.title, locale)}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted-2">{project.period}</p>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {t(project.summary, locale)}
              </p>

              {project.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2">
                {dict.common.readMore}
                <ArrowRightIcon width={16} height={16} />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted">{dict.projects.empty}</p>
      )}
    </div>
  );
}
