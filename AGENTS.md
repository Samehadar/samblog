# AGENTS.md — AI Agent Instructions

This file provides context for AI coding agents (Claude Code, Cursor, Copilot, etc.).

## Project

**samblog** — multilingual personal blog. Astro 6 + Vue 3 + Tailwind CSS 4 + MDX.

## Quick reference

| Area | Path |
|---|---|
| Pages | `src/pages/[locale]/` |
| Layouts | `src/layouts/` |
| Components | `src/components/` |
| Blog articles | `src/content/blog/` |
| Static pages | `src/content/pages/` |
| Things I Do | `src/content/things/` |
| Collection schemas | `src/content.config.ts` |
| i18n strings | `src/i18n/ui.ts` |
| Site constants | `src/consts.ts` |
| Global styles | `src/styles/global.css` |
| Fonts | `public/fonts/cambria/` |

## Key rules

- Three locales: `en` (default), `ru`, `pl`. All i18n keys must exist in all three.
- Dark mode is the default. Theme toggle persists to localStorage.
- Font: Cambria for all text (`--font-serif`). Preloaded in `Base.astro`.
- Blog post locale and site UI locale are decoupled — articles stay in original language regardless of UI language.
- `things` collection uses `thingId` in frontmatter (not `slug`) to avoid Astro glob loader conflicts.
- MDX files use `{/* */}` for comments, not `<!-- -->`.
- No code comments unless explaining non-obvious intent.
- Do not rename existing methods/fields or do major refactoring without explicit request.

## Development

```bash
nvm use 22    # Node.js >= 22.12.0 required
npm install
npm run dev   # starts on localhost:4321
npm run build
```

## Git

- **Never** change git config (user.name, user.email).
- **Never** commit as the AI agent. All commits must be authored by: `Vitaly Lyutarevich <vitaly.lyutarevich@gmail.com>`.
- Local git config is already set — do not override it.
- Do not push without explicit user permission.

## Author

Vitaly Lyutarevich (EN), Виталий Лютаревич (RU), Witalis Lutorowicz (PL).
