import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_KEY } from "../config/StorageKeys";
import { ThemePalette, lightPalette, darkPalette } from "../theme/palette";

export type ThemeMode = "light" | "dark";

interface ThemeState {
    theme: ThemeMode,
    colors: ThemePalette,
    hydrateTheme: () => Promise<void>,
    toggleTheme: () => void,
}

const palettes: Record<ThemeMode, ThemePalette> = {
    light: lightPalette,
    dark: darkPalette,
};

const useThemeStore = create<ThemeState>((set, get) => ({
    theme: "light",
    colors: palettes.light,

    hydrateTheme: async () => {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
            set({ theme: storedTheme, colors: palettes[storedTheme] });
        }
    },

    toggleTheme: () => {
        const theme = get().theme === "light" ? "dark" : "light";
        set({ theme, colors: palettes[theme] });
        AsyncStorage.setItem(THEME_KEY, theme);
    },
}));

export default useThemeStore;
