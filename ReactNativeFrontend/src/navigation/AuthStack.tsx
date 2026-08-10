import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
    const { t } = useTranslation();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: t("navigation.login") }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: t("navigation.register") }} />
        </Stack.Navigator>
    );
}

export default AuthStack;
