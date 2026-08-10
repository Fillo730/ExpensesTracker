import { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

function LoginScreen({ navigation }: Props) {
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
            setError("Credenziali non valide. Riprova.");
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
                    <Text style={[styles.title, { color: colors.text }]}>Bentornato</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Accedi al tuo account per continuare
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        label="Username"
                        placeholder="Il tuo username"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <AppTextInput
                        label="Password"
                        placeholder="La tua password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

                    <View style={styles.actions}>
                        <AppButton
                            title="Accedi"
                            onPress={handleLogin}
                            disabled={!username || !password}
                            loading={isSubmitting || isLoading}
                        />
                        <AppButton
                            title="Crea un account"
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
