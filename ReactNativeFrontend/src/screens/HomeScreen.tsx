import { View, Text, StyleSheet } from "react-native";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";
import AppButton from "../components/AppButton";

function HomeScreen() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const colors = useThemeStore((state) => state.colors);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.greeting, { color: colors.text }]}>Ciao, {user?.username}</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Bentornato nella tua dashboard
                </Text>
            </View>

            <AppButton title="Logout" variant="secondary" onPress={() => logout()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
        gap: 24,
    },
    header: {
        alignItems: "center",
        gap: 6,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 15,
    },
});

export default HomeScreen;
