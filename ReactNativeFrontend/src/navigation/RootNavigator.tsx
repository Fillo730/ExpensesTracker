import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useAuthStore from "../hooks/useAuth";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

function RootNavigator() {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default RootNavigator;
