export const locales = ['en', 'ua'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ua';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ua: 'Українська',
};
