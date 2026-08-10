import { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
    const { t } = useTranslation();
    const register = useAuthStore((state) => state.register);
    const colors = useThemeStore((state) => state.colors);
    const isLoading = useAuthStore((state) => state.isLoading);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        setError(null);

        if (password !== confirmPassword) {
            setError(t("auth.register.passwordMismatch"));
            return;
        }

        setIsSubmitting(true);
        try {
            await register({ username, email, password });
        } catch {
            setError(t("auth.register.error"));
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
                    <Text style={[styles.title, { color: colors.text }]}>{t("auth.register.title")}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        {t("auth.register.subtitle")}
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        label={t("auth.register.usernameLabel")}
                        placeholder={t("auth.register.usernamePlaceholder")}
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <AppTextInput
                        label={t("auth.register.emailLabel")}
                        placeholder={t("auth.register.emailPlaceholder")}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <AppTextInput
                        label={t("auth.register.passwordLabel")}
                        placeholder={t("auth.register.passwordPlaceholder")}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <AppTextInput
                        label={t("auth.register.confirmPasswordLabel")}
                        placeholder={t("auth.register.confirmPasswordPlaceholder")}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

                    <View style={styles.actions}>
                        <AppButton
                            title={t("auth.register.submit")}
                            onPress={handleRegister}
                            disabled={!username || !email || !password}
                            loading={isSubmitting || isLoading}
                        />
                        <AppButton
                            title={t("auth.register.goToLogin")}
                            variant="secondary"
                            onPress={() => navigation.navigate("Login")}
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
});

export default RegisterScreen;
