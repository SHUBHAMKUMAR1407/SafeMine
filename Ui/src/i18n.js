// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationHI from './locales/hi/translation.json';

// The translations
const resources = {
  en: { translation: translationEN },
  hi: { translation: translationHI },
};

i18n
  .use(HttpApi)
  .use(LanguageDetector) // Detects the user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: true, // Set to true for debugging
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
