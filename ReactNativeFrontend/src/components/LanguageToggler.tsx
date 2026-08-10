import { Pressable, StyleSheet, Text } from "react-native";
import useLanguageStore from "../hooks/useLanguage";
import useThemeStore from "../hooks/useTheme";
import { supportedLanguages } from "../i18n";

const LANGUAGE_LABELS: Record<string, string> = {
    it: "IT",
    en: "EN",
};

function LanguageToggler() {
    const language = useLanguageStore((state) => state.language);
    const setLanguage = useLanguageStore((state) => state.setLanguage);
    const colors = useThemeStore((state) => state.colors);

    const handlePress = () => {
        const currentIndex = supportedLanguages.indexOf(language);
        const nextLanguage = supportedLanguages[(currentIndex + 1) % supportedLanguages.length];
        setLanguage(nextLanguage);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
            <Text style={[styles.label, { color: colors.text }]}>{LANGUAGE_LABELS[language] ?? language}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 44,
        minWidth: 44,
        paddingHorizontal: 12,
        borderRadius: 22,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
    },
});

export default LanguageToggler;
