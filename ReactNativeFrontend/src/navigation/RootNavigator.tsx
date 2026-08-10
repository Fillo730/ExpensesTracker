import { View, ActivityIndicator } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

function RootNavigator() {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const theme = useThemeStore((state) => state.theme);
    const colors = useThemeStore((state) => state.colors);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    const baseTheme = theme === "dark" ? DarkTheme : DefaultTheme;
    const navTheme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            background: colors.background,
            card: colors.surface,
            text: colors.text,
            border: colors.border,
            primary: colors.primary,
        },
    };

    return (
        <NavigationContainer theme={navTheme}>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default RootNavigator;
