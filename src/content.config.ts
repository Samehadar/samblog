import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    locale: z.enum(["ru", "en", "pl"]),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    toc: z.boolean().default(false),
    habr: z.string().optional(),
    video: z.boolean().default(false),
    ogImage: z.string().optional(),
    translations: z
      .object({
        ru: z.string().optional(),
        en: z.string().optional(),
        pl: z.string().optional(),
      })
      .optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(["ru", "en", "pl"]),
    updated: z.coerce.date().optional(),
  }),
});

const things = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/things" }),
  schema: z.object({
    title: z.string(),
    locale: z.enum(["ru", "en", "pl"]),
    thingId: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
          ruOnly: z.boolean().default(false),
        })
      )
      .default([]),
    order: z.number().default(0),
  }),
});

export const collections = { blog, pages, things };
