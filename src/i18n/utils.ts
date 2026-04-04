import { ui, type UIKey } from "./ui";
import { defaultLocale, type Locale, locales } from "../consts";

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split("/");
  if (locales.includes(lang as Locale)) return lang as Locale;
  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui[defaultLocale][key] ?? key;
  };
}

export function getLocalePath(locale: Locale, path: string = ""): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${clean}`;
}

export function switchLocalePath(
  currentUrl: URL,
  targetLocale: Locale,
): string {
  const segments = currentUrl.pathname.split("/").filter(Boolean);
  if (locales.includes(segments[0] as Locale)) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }
  return "/" + segments.join("/");
}
