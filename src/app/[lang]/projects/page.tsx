import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { projects } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import { ExternalIcon } from "@/components/Icons";

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
      <PageHeader
        title={dict.projects.title}
        subtitle={dict.projects.subtitle}
      />

      {projects.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <article
              key={i}
              className="flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-serif text-xl font-semibold leading-snug text-foreground">
                  {t(project.title, locale)}
                </h3>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-2">{project.period}</p>

              <p className="mt-3 text-sm font-medium text-foreground">
                {t(project.summary, locale)}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {t(project.description, locale)}
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

              {project.links && Object.values(project.links).some(Boolean) && (
                <div className="mt-4 flex flex-wrap gap-3 border-t border-border pt-4">
                  {project.links.repo && (
                    <LinkItem href={project.links.repo} label="Code" />
                  )}
                  {project.links.paper && (
                    <LinkItem href={project.links.paper} label="Article" />
                  )}
                  {project.links.demo && (
                    <LinkItem href={project.links.demo} label="Démo" />
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted">{dict.projects.empty}</p>
      )}
    </div>
  );
}

function LinkItem({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
    >
      {label}
      <ExternalIcon width={14} height={14} />
    </a>
  );
}
