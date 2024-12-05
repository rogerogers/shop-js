import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  // Validate that the incoming `locale` parameter is valid
  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../dictionaries/${locale}.json`)).default,
  };
});

export const nameMap = {
  en: 'English',
  zh: '简体中文',
};
