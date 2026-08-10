import { useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";
import useAuthStore from "../hooks/useAuth";
import useThemeStore from "../hooks/useTheme";

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Login</Text>

            <TextInput
                style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.surface }]}
                placeholder="Username"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, { borderColor: colors.border, color: colors.text, backgroundColor: colors.surface }]}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}

            {isSubmitting || isLoading ? (
                <ActivityIndicator color={colors.primary} />
            ) : (
                <Button title="Accedi" onPress={handleLogin} disabled={!username || !password} color={colors.primary} />
            )}

            <Button title="Vai a Registrazione" onPress={() => navigation.navigate("Register")} color={colors.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        gap: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
    },
    error: {
        color: "red",
    },
})

export default LoginScreen;
