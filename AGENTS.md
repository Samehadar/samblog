# AGENTS.md — AI Agent Instructions

This file provides context for AI coding agents (Claude Code, Cursor, Copilot, etc.).

## Project

**samblog** — multilingual personal blog. Astro 6 + Vue 3 + Tailwind CSS 4 + MDX.
Domain: `https://lyutarevich.com`. Deployed to GitHub Pages via GitHub Actions on push to `master`.

## Quick reference

| Area | Path |
|---|---|
| Pages | `src/pages/[locale]/` |
| Root redirect | `src/pages/index.astro` (detects locale via localStorage / navigator) |
| Layouts | `src/layouts/Base.astro`, `src/layouts/Post.astro` |
| Components | `src/components/` (`.astro` + `.vue`) |
| Blog articles | `src/content/blog/` |
| Static pages | `src/content/pages/` |
| Things I Do | `src/content/things/` |
| Collection schemas | `src/content.config.ts` |
| i18n strings | `src/i18n/ui.ts` |
| i18n helpers | `src/i18n/utils.ts` |
| Site constants | `src/consts.ts` |
| SEO meta + JSON-LD | `src/components/SEO.astro` |
| Global styles | `src/styles/global.css` |
| Fonts | `public/fonts/fira/` (Cambria in `public/fonts/cambria/` is no longer used) |
| Static assets | `public/` (images, papers, robots.txt, _headers, CNAME, favicons) |
| RSS feeds | `src/pages/rss.xml.ts`, `src/pages/[locale]/rss.xml.ts` |
| Remark plugins | `src/plugins/remark-reading-time.mjs` |

## Content collections

### blog

Fields: `title`, `date`, `locale`, `tags`, `description`, `toc`, optional `lead` (2–3 sentence standfirst shown above the article body), optional `takeaways` (3–5 key points), optional `habr` (URL to Habr article), optional `translations` (`{ ru, en, pl }`).
`readingTime` is computed by `remark-reading-time` plugin — not a frontmatter field.
Posts with `habr` get a branded Habr badge in post cards and article pages.

### things

Fields: `title`, `locale`, `thingId`, `description`, `tags`, `links` (array of `{ label, href, ruOnly }`), `order`.
Uses `thingId` (not `slug`) to group translations and avoid Astro glob loader conflicts.
Links with `ruOnly: true` are only visible when locale is `ru`.
Scientific publications (`thingId: publications`) link to PDFs stored in `public/papers/`.

### pages

Fields: `title`, `locale`, optional `updated`.

## Key rules

- Three locales: `en` (default), `ru`, `pl`. All i18n keys must exist in all three.
- Dark mode is the default. Theme toggle persists to localStorage.
- Font: Fira Sans for all text, self-hosted in `public/fonts/fira/` with Latin, Latin Extended and Cyrillic subsets (`--font-serif` is the historical variable name); Fira Mono for code. Body line-height 1.6. Preloaded in `Base.astro`.
- Blog post locale and site UI locale are decoupled — articles stay in original language regardless of UI language.
- MDX files use `{/* */}` for comments, not `<!-- -->`.
- No code comments unless explaining non-obvious intent.
- Do not rename existing methods/fields or do major refactoring without explicit request.

## Analytics

[Umami](https://umami.is) (privacy-friendly, no cookies). Script injected in `Base.astro` only when `PUBLIC_UMAMI_WEBSITE_ID` env variable is set, and limited to the production hostname via `data-domains` (local dev visits are not counted). In CI, it's read from GitHub Actions repository variable.

Article reading events are sent from `src/layouts/Post.astro` (each carries `post` = article id):

| Event | Properties | When |
|---|---|---|
| `read-depth` | `depth`: 25 / 50 / 75 / 100 | The bottom of the viewport passes that share of the article body |
| `read-time` | `minutes`: 1 / 3 / 5 / 10 / 20 | Active reading time: tab visible and reader interacted within the last minute |
| `toc-click` | `place`: sidebar / inline / cards, `target` | Click on a table-of-contents link |
| `habr-click` | `host`, `place`: badge / body / page | Click on a habr.com link |
| `outbound-click` | `host`, `place` | Click on any other external link |
| `share` | `network`: telegram / linkedin / twitter / copy | Click on a share button |

## Development

```bash
nvm use 22    # Node.js >= 22.12.0 required
cp .env.example .env  # fill in PUBLIC_UMAMI_WEBSITE_ID (optional)
npm install
npm run dev   # starts on localhost:4321
npm run build
```

## Git

- **Never** change git config (user.name, user.email).
- **Never** commit as the AI agent. All commits must be authored by: `Vitaly Lyutarevich <vitaly.lyutarevich@gmail.com>`.
- Local git config is already set — do not override it.
- **Never** commit or push without explicit user permission.

## Author

Vitaly Lyutarevich (EN), Виталий Лютаревич (RU), Witalis Lutorowicz (PL).
