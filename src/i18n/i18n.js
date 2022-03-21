
import i18n from 'i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next"
import backend from "i18next-http-backend";
import en from './en.json';
import ua from './ua.json';
import ru from './ru.json';


const resources ={
    ua: {translation: ua},
    en: {translation: en},
    ru: {translation: ru}


};

i18n
    .use(initReactI18next)
    .use(backend)
    .use(LanguageDetector)
    .init({
        resources,
        language:[en, ua, ru],
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
