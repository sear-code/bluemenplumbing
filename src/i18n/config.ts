import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Lazy-load French locale on first request
const originalChangeLanguage = i18n.changeLanguage.bind(i18n);
i18n.changeLanguage = async (lng?: string, callback?: (err: any, t: any) => void) => {
  if (lng === 'fr' && !i18n.hasResourceBundle('fr', 'translation')) {
    const fr = (await import('./locales/fr.json')).default;
    i18n.addResourceBundle('fr', 'translation', fr);
  }
  return originalChangeLanguage(lng, callback);
};

export default i18n;