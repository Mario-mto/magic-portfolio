"use client";
import { useLang } from "@/lib/i18n";

export function LangBody({ en, fr }: { en: React.ReactNode; fr: React.ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "fr" ? fr : en}</>;
}
