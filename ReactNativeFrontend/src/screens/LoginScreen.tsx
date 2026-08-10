import { StyleSheet, View, Text, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

function LoginScreen({ navigation }: Props) {
    return (
        <View>
            <Text>Login</Text>
            <Button title="Vai a Registrazione" onPress={() => navigation.navigate("Register")} />
        </View>
    );
}

const styles = StyleSheet.create({

})

export default LoginScreen;
