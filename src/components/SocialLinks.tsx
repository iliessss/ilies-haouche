import { profile } from "@/content/site";
import {
  GithubIcon,
  HalIcon,
  LinkedinIcon,
  MailIcon,
  OrcidIcon,
  ResearchGateIcon,
  ScholarIcon,
} from "./Icons";

type SocialLinksProps = {
  size?: "sm" | "md";
  className?: string;
};

export default function SocialLinks({ size = "md", className = "" }: SocialLinksProps) {
  const items = [
    { href: profile.links.email, label: "Email", Icon: MailIcon },
    { href: profile.links.scholar, label: "Google Scholar", Icon: ScholarIcon },
    { href: profile.links.orcid, label: "ORCID", Icon: OrcidIcon },
    { href: profile.links.hal, label: "HAL", Icon: HalIcon },
    { href: profile.links.researchgate, label: "ResearchGate", Icon: ResearchGateIcon },
    { href: profile.links.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { href: profile.links.github, label: "GitHub", Icon: GithubIcon },
  ].filter((item) => item.href && item.href.length > 0);

  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map(({ href, label, Icon }) => {
        const isMail = href.startsWith("mailto:");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noopener noreferrer"}
            className={`inline-flex ${box} items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent`}
          >
            <Icon width={18} height={18} />
          </a>
        );
      })}
    </div>
  );
}
