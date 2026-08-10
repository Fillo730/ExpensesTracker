import { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

function LoginScreen({ navigation }: Props) {
    const { t } = useTranslation();
    const isLoading = useAuthStore((state) => state.isLoading);
    const login = useAuthStore((state) => state.login);
    const colors = useThemeStore((state) => state.colors);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async () => {
        setError(null);
        setIsSubmitting(true);
        try {
            await login({ username, password });
        } catch {
            setError(t("auth.login.error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={[styles.flex, { backgroundColor: colors.background }]}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={[styles.title, { color: colors.text }]}>{t("auth.login.title")}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        {t("auth.login.subtitle")}
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        label={t("auth.login.usernameLabel")}
                        placeholder={t("auth.login.usernamePlaceholder")}
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <AppTextInput
                        label={t("auth.login.passwordLabel")}
                        placeholder={t("auth.login.passwordPlaceholder")}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

                    <View style={styles.actions}>
                        <AppButton
                            title={t("auth.login.submit")}
                            onPress={handleLogin}
                            disabled={!username || !password}
                            loading={isSubmitting || isLoading}
                        />
                        <AppButton
                            title={t("auth.login.goToRegister")}
                            variant="secondary"
                            onPress={() => navigation.navigate("Register")}
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        maxWidth: 420,
        width: "100%",
        alignSelf: "center",
    },
    header: {
        marginBottom: 32,
        gap: 6,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 15,
    },
    form: {
        gap: 16,
    },
    actions: {
        gap: 10,
        marginTop: 8,
    },
    error: {
        fontSize: 14,
    },
})

export default LoginScreen;
