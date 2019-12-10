
import i18n from 'i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next"
import backend from "i18next-xhr-backend";
import en from '../translations/en';
import ua from '../translations/ua';


const resources ={
    ua: {translation: ua},
    en: {translation: en}

};

i18n
    .use(initReactI18next)
    .use(backend)
    .use(LanguageDetector)
    .init({
        resources,
        language:[en, ua],
        fallbackLng: en,
        debug: true,

        interpolation: {
            escapeValue: false,
            formatSeparator: ',',
        },
        react: {
            wait: true,
            useSuspense: false,
        },

    });


export default i18n;
