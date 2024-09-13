import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const isServer = typeof window === 'undefined';

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        supportedLngs: ['en', 'sh', 'nd'],
        fallbackLng: 'en',
        debug: false,

        detection: {
            order: ['path', 'cookie', 'navigator'],
            caches: ['cookie'],
        },

        backend: {
            loadPath: isServer
                ? './public/locales/{{lng}}/translation.json'
                : '/locales/{{lng}}/translation.json',
        },

        react: {
            useSuspense: false,
        },
    });

export default i18next;