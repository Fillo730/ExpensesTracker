import { View, Text, Button } from "react-native";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";

function HomeScreen() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const colors = useThemeStore((state) => state.colors);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16, backgroundColor: colors.background }}>
            <Text style={{ color: colors.text }}>Ciao, {user?.username}</Text>
            <Button title="Logout" onPress={() => logout()} color={colors.primary} />
        </View>
    );
}

export default HomeScreen;
