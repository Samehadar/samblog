# samblog

Personal multilingual blog built with [Astro](https://astro.build), Vue 3, and Tailwind CSS 4.

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
- SEO: JSON-LD, hreflang, sitemap
- Font preloading, cache headers
- Analytics via [Umami](https://umami.is) (no cookies, GDPR-compliant)

## Development

```bash
cp .env.example .env   # fill in your values
npm install
npm run dev
```

Requires Node.js >= 22.12.0.

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
