import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggler from "./ThemeToggler";
import LanguageToggler from "./LanguageToggler";

function TopBar() {
    return (
        <SafeAreaView edges={["top"]} style={styles.safeArea} pointerEvents="box-none">
            <LanguageToggler />
            <ThemeToggler />
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
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        padding: 12,
    },
});

export default TopBar;
