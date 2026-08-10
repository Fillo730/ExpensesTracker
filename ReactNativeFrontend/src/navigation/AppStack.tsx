import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import HomeScreen from "../screens/HomeScreen";

export type AppStackParamList = {
    Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

function AppStack() {
    const { t } = useTranslation();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: t("navigation.home") }} />
        </Stack.Navigator>
    );
}

export default AppStack;
