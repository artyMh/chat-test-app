import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './translations/en.json';
import translationLV from './translations/lv.json';
import translationRU from './translations/ru.json';

const resources = {
  en: {
    translation: translationEN
  },
  lv: {
    translation: translationLV
  },
  ru: {
    translation: translationRU
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en'
  });

export default i18n;
