import { Fragment, type ReactNode } from "react";

/**
 * Rend une chaîne en mettant en **gras** les portions entourées de `**`.
 * Pratique pour faire ressortir votre nom dans une liste d'auteurs.
 */
export function renderBold(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
