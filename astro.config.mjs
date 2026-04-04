// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import remarkReadingTime from "./src/plugins/remark-reading-time.mjs";

export default defineConfig({
  site: "https://example.com",
  i18n: {
    defaultLocale: "en",
    locales: ["ru", "en", "pl"],
    routing: "manual",
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap(), vue({ appEntrypoint: "/src/pages/_app" })],
});
