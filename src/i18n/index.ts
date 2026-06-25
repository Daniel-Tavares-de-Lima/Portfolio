import pt from './pt.json';
import en from './en.json';

const translations = { pt, en } as const;
export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
