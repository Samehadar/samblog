// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import remarkReadingTime from "./src/plugins/remark-reading-time.mjs";

const isCI = !!process.env.CI;

export default defineConfig({
  site: isCI ? "https://samehadar.github.io" : "http://localhost:4321",
  base: isCI ? "/samblog" : "/",
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
