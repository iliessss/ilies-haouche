import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/config";

// Redirige la racine "/" vers la langue par défaut.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
