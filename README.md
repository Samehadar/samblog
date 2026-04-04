# samblog

Personal multilingual blog built with [Astro](https://astro.build), Vue 3, and Tailwind CSS 4.

Live: [lyutarevich.com](https://lyutarevich.com)

## Stack

- **Astro 6** — static site generation
- **Vue 3** — interactive components
- **Tailwind CSS 4** — styling
- **MDX** — content authoring
- **Umami** — privacy-friendly analytics

## Features

- Three languages: English, Russian, Polish
- Dark mode (default)
- Sidebar table of contents with scroll-spy
- RSS feeds (per language + global)
- SEO: JSON-LD, Open Graph, hreflang, sitemap, robots.txt
- Font preloading, cache headers
- Analytics via [Umami](https://umami.is) (no cookies, GDPR-compliant)
- Habr badge for cross-posted articles
- Scientific publications with downloadable PDFs
- Automatic reading time calculation

## Development

```bash
cp .env.example .env   # fill in your values
nvm use 22             # Node.js >= 22.12.0 required
npm install
npm run dev
```

### Environment variables

| Variable | Description | Required |
|---|---|---|
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami website ID (UUID from [cloud.umami.is](https://cloud.umami.is)) | No |

When `PUBLIC_UMAMI_WEBSITE_ID` is not set, the analytics script is not injected — useful for local development.

## Build

```bash
npm run build
npm run preview
```

## Deployment

The site is deployed to GitHub Pages via GitHub Actions on push to `master`.

For analytics to work in production, add the Umami website ID as a **repository variable** (not secret):

**Settings → Secrets and variables → Actions → Variables → New repository variable**

- Name: `PUBLIC_UMAMI_WEBSITE_ID`
- Value: your Umami website UUID

## Project structure

```
src/
├── components/     # Astro + Vue components
├── content/        # MDX content collections
│   ├── blog/       # Blog articles
│   ├── pages/      # Static pages (about, now)
│   └── things/     # "Things I Do" cards
├── i18n/           # Translation strings and helpers
├── layouts/        # Base and Post layouts
├── pages/          # File-based routing
├── plugins/        # Remark plugins (reading time)
└── styles/         # Global CSS with design tokens
public/
├── fonts/          # Cambria font files
├── images/         # Static images
└── papers/         # Scientific publication PDFs
```
