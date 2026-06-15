import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { projects } from "@/content/site";
import { getProjectContent } from "@/lib/projects";
import Markdown from "@/components/Markdown";
import { ArrowRightIcon, DocIcon, ExternalIcon } from "@/components/Icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const project = projects.find((p) => p.slug === slug);
  return { title: project ? t(project.title, locale) : "Projet" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  const dict = getDictionary(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const content = getProjectContent(slug, locale);
  const externalLinks = [
    { href: project.links?.repo, label: "Code" },
    { href: project.links?.paper, label: locale === "fr" ? "Article" : "Paper" },
    { href: project.links?.demo, label: locale === "fr" ? "Démo / vidéos" : "Demo / videos" },
    { href: project.links?.appstore, label: "App Store" },
    { href: project.links?.playstore, label: "Google Play" },
  ].filter((l) => l.href);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href={`/${locale}/projects`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowRightIcon width={16} height={16} className="rotate-180" />
        {dict.projects.back}
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <p className="font-mono text-xs text-muted-2">{project.period}</p>
        <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t(project.title, locale)}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">
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
      </header>

      {/* Corps : contenu Markdown si présent, sinon la description */}
      <div className="mt-8">
        {content ? (
          <Markdown>{content}</Markdown>
        ) : (
          <p className="text-base leading-relaxed text-muted">
            {t(project.description, locale)}
          </p>
        )}
      </div>

      {/* Téléchargements PDF */}
      {project.downloads && project.downloads.length > 0 && (
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            {dict.projects.downloads}
          </h2>
          <div className="mt-4 flex flex-col gap-2">
            {project.downloads.map((d) => (
              <a
                key={d.file}
                href={d.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-lg border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <DocIcon width={18} height={18} />
                {t(d.label, locale)}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Liens externes */}
      {externalLinks.length > 0 && (
        <section className="mt-10 border-t border-border pt-8">
          <div className="flex flex-wrap gap-3">
            {externalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                {l.label}
                <ExternalIcon width={14} height={14} />
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
