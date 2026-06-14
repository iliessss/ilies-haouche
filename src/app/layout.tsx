import "./globals.css";
import type { ReactNode } from "react";

// Layout racine minimal : la balise <html>/<body>, les polices et le thème
// sont gérés par src/app/[lang]/layout.tsx afin de connaître la langue active.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
