"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Lang = "en" | "fr";
export type Translatable = string | { en: string; fr: string };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch {}
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => setLangState((cur) => {
    const next = cur === "en" ? "fr" : "en";
    try { localStorage.setItem("lang", next); } catch {}
    document.documentElement.lang = next;
    return next;
  }), []);

  return <LangContext.Provider value={{ lang, setLang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }

/** Pick the active-language string from a Translatable (plain string or {en,fr}). */
export function tr(lang: Lang, v: Translatable): string {
  return typeof v === "string" ? v : v[lang];
}
