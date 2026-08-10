import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";
import useThemeStore from "../hooks/useTheme";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
    const colors = useThemeStore((state) => state.colors);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16, backgroundColor: colors.background }}>
            <Text style={{ color: colors.text }}>Registrazione</Text>
            <Button title="Torna al Login" onPress={() => navigation.navigate("Login")} color={colors.primary} />
        </View>
    );
}

export default RegisterScreen;
