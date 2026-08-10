import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeStore from "../hooks/useTheme";

function ThemeToggler() {
    const theme = useThemeStore((state) => state.theme);
    const colors = useThemeStore((state) => state.colors);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea} pointerEvents="box-none">
            <Pressable
                onPress={toggleTheme}
                style={[styles.button, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
                <Text style={styles.icon}>{theme === "dark" ? "🌙" : "☀️"}</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        alignItems: "flex-end",
    },
    button: {
        margin: 12,
        width: 44,
        height: 44,
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
    icon: {
        fontSize: 20,
    },
});

export default ThemeToggler;
