import { useState } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
    const register = useAuthStore((state) => state.register);
    const colors = useThemeStore((state) => state.colors);
    const isLoading = useAuthStore((state) => state.isLoading);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        setError(null);
        setIsSubmitting(true);
        try {
            await register({ username, email, password });
        } catch {
            setError("Registrazione non riuscita. Riprova.");
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
                    <Text style={[styles.title, { color: colors.text }]}>Crea account</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Registrati per iniziare a tracciare le tue spese
                    </Text>
                </View>

                <View style={styles.form}>
                    <AppTextInput
                        label="Username"
                        placeholder="Scegli uno username"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <AppTextInput
                        label="Email"
                        placeholder="nome@esempio.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <AppTextInput
                        label="Password"
                        placeholder="Crea una password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

                    <View style={styles.actions}>
                        <AppButton
                            title="Registrati"
                            onPress={handleRegister}
                            disabled={!username || !email || !password}
                            loading={isSubmitting || isLoading}
                        />
                        <AppButton
                            title="Torna al login"
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
