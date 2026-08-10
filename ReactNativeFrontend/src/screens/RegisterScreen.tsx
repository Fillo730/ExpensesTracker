import { View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

function RegisterScreen({ navigation }: Props) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
            <Text>Registrazione</Text>
            <Button title="Torna al Login" onPress={() => navigation.navigate("Login")} />
        </View>
    );
}

export default RegisterScreen;
