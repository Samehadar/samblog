import { ui, type UIKey } from "./ui";
import { defaultLocale, type Locale, locales } from "../consts";

export function getLocaleFromUrl(url: URL): Locale {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
  const [, lang] = path.split("/");
  if (locales.includes(lang as Locale)) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}

export function getLocalePath(locale: Locale, path: string = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${locale}/${clean}`;
}

export function switchLocalePath(
  currentUrl: URL,
  targetLocale: Locale,
): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const baseParts = base.split("/").filter(Boolean);
  const segments = currentUrl.pathname.split("/").filter(Boolean);
  const pathSegments = segments.slice(baseParts.length);
  if (locales.includes(pathSegments[0] as Locale)) {
    pathSegments[0] = targetLocale;
  } else {
    pathSegments.unshift(targetLocale);
  }
  return base + "/" + pathSegments.join("/");
}
