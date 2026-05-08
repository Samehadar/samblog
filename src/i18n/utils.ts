import type { CollectionEntry } from "astro:content";
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

export interface PostGroup {
  canonical: CollectionEntry<"blog">;
  availableLocales: Locale[];
  slugByLocale: Partial<Record<Locale, string>>;
}

export function groupPostsByTranslation(
  posts: CollectionEntry<"blog">[],
  preferredLocale: Locale,
): PostGroup[] {
  const byId = new Map(posts.map((p) => [p.id, p]));
  const visited = new Set<string>();
  const groups: PostGroup[] = [];

  for (const post of posts) {
    if (visited.has(post.id)) continue;

    const queue: CollectionEntry<"blog">[] = [post];
    const groupPosts: CollectionEntry<"blog">[] = [];
    while (queue.length > 0) {
      const p = queue.shift()!;
      if (visited.has(p.id)) continue;
      visited.add(p.id);
      groupPosts.push(p);
      const t = p.data.translations;
      if (t) {
        for (const slug of Object.values(t)) {
          if (slug && byId.has(slug) && !visited.has(slug)) {
            queue.push(byId.get(slug)!);
          }
        }
      }
    }

    const slugByLocale: Partial<Record<Locale, string>> = {};
    for (const p of groupPosts) {
      slugByLocale[p.data.locale as Locale] = p.id;
    }

    let canonical = groupPosts.find((p) => p.data.locale === preferredLocale);
    if (!canonical) {
      const sorted = [...groupPosts].sort(
        (a, b) =>
          locales.indexOf(a.data.locale as Locale) -
          locales.indexOf(b.data.locale as Locale),
      );
      canonical = sorted[0];
    }

    const availableLocales = locales.filter((l) => slugByLocale[l]);

    groups.push({ canonical, availableLocales, slugByLocale });
  }

  return groups;
}
