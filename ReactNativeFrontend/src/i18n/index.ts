import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import it from "./locales/it.json";
import en from "./locales/en.json";

export const resources = {
    it: { translation: it },
    en: { translation: en },
} as const;

export type SupportedLanguage = keyof typeof resources;

export const supportedLanguages: SupportedLanguage[] = ["it", "en"];

const deviceLanguage = Localization.getLocales()[0]?.languageCode;
const initialLanguage: SupportedLanguage =
    deviceLanguage && supportedLanguages.includes(deviceLanguage as SupportedLanguage)
        ? (deviceLanguage as SupportedLanguage)
        : "it";

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: initialLanguage,
        fallbackLng: "it",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
