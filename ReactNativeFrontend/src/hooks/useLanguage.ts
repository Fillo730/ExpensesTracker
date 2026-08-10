import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGE_KEY } from "../config/StorageKeys";
import i18next, { SupportedLanguage, supportedLanguages } from "../i18n";

interface LanguageState {
    language: SupportedLanguage,
    hydrateLanguage: () => Promise<void>,
    setLanguage: (language: SupportedLanguage) => void,
}

const useLanguageStore = create<LanguageState>((set) => ({
    language: i18next.language as SupportedLanguage,

    hydrateLanguage: async () => {
        const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (storedLanguage && supportedLanguages.includes(storedLanguage as SupportedLanguage)) {
            const language = storedLanguage as SupportedLanguage;
            await i18next.changeLanguage(language);
            set({ language });
        }
    },

    setLanguage: (language) => {
        i18next.changeLanguage(language);
        set({ language });
        AsyncStorage.setItem(LANGUAGE_KEY, language);
    },
}));

export default useLanguageStore;
