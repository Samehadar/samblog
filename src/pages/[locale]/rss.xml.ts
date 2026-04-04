import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, locales, type Locale } from "../../consts";
import type { APIContext } from "astro";

export function getStaticPaths() {
  return locales.map((locale) => ({ params: { locale } }));
}

export async function GET(context: APIContext) {
  const locale = context.params.locale as Locale;
  const posts = await getCollection("blog");
  const filtered = posts
    .filter((p) => p.data.locale === locale)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${SITE.author[locale]} — Blog`,
    description: `${SITE.author[locale]} — personal blog (${locale.toUpperCase()})`,
    site: context.site,
    items: filtered.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${locale}/blog/${post.id}`,
    })),
  });
}
