import { profile } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import SocialLinks from "./SocialLinks";

export default function Footer({
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const year = 2026; // mettez à jour si besoin

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          © {year} {profile.name}. {dict.footer.rights}
        </p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
