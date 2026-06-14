import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { publications } from "@/content/site";
import PageHeader from "@/components/PageHeader";
import PublicationsList from "@/components/PublicationsList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "fr";
  return { title: getDictionary(locale).publications.title };
}

export default async function PublicationsPage({
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
        title={dict.publications.title}
        subtitle={dict.publications.subtitle}
      />
      {publications.length > 0 ? (
        <PublicationsList
          publications={publications}
          locale={locale}
          dict={dict}
        />
      ) : (
        <p className="mt-8 text-muted">{dict.publications.empty}</p>
      )}
    </div>
  );
}
