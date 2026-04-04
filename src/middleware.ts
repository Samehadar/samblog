import { sequence, defineMiddleware } from "astro:middleware";

const i18nMiddleware = defineMiddleware(async (_context, next) => {
  return next();
});

export const onRequest = sequence(i18nMiddleware);
