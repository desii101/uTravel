import i18next, * as i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import arTranslation from "../messages/ar.json";
import enTranslation from "../messages/en.json";
import heTranslation from "../messages/he.json";

const supportedLangs = ['en', 'ar', 'he'];
const fallback = 'en';

const resources = {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
    he: { translation: heTranslation },
};

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: resources,
        supportedLngs: supportedLangs,
        fallbackLng: fallback,
        detection: { lookupLocalStorage: 'lang' },
        interpolation: {
            escapeValue: false
        },
    });

function updateI18n() {
    const dir = i18n.dir();
    const lng = i18next.language
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
}

updateI18n();

i18next.on("languageChanged", () => {
    updateI18n();
});