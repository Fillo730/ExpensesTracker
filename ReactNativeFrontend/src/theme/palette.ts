export interface ThemePalette {
    background: string,
    surface: string,
    text: string,
    textSecondary: string,
    border: string,
    primary: string,
    error: string,
}

export const lightPalette: ThemePalette = {
    background: "#ffffff",
    surface: "#f5f5f5",
    text: "#1a1a1a",
    textSecondary: "#6b6b6b",
    border: "#d0d0d0",
    primary: "#2563eb",
    error: "#dc2626",
};

export const darkPalette: ThemePalette = {
    background: "#121212",
    surface: "#1e1e1e",
    text: "#f5f5f5",
    textSecondary: "#a0a0a0",
    border: "#3a3a3a",
    primary: "#3b82f6",
    error: "#f87171",
};
