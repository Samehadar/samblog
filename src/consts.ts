export const SITE = {
  domain: "https://samehadar.github.io/samblog",
  author: {
    ru: "Виталий Лютаревич",
    en: "Vitaly Lyutarevich",
    pl: "Witalis Lutorowicz",
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/lyutarevich/",
    telegram: "https://t.me/lyutarevich",
    github: "https://github.com/Samehadar",
  },
} as const;

export type Locale = "ru" | "en" | "pl";
export const locales: Locale[] = ["en", "ru", "pl"];
export const defaultLocale: Locale = "en";
