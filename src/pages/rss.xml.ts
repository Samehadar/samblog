import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../consts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: `${SITE.author.en} — Blog`,
    description: `${SITE.author.en} — personal blog`,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/${post.data.locale}/blog/${post.id}`,
      })),
  });
}
