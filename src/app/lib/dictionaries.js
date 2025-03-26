// Ensure this file is only used in server components
import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (!dictionaries[locale]) {
    throw new Error(`Locale '${locale}' is not supported.`);
  }
  return dictionaries[locale]();
};