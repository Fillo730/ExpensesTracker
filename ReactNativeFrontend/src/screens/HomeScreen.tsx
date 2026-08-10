import { View, Text, Button } from "react-native";
import useAuthStore from "../hooks/useAuth";

function HomeScreen() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
            <Text>Ciao, {user?.username}</Text>
            <Button title="Logout" onPress={() => logout()} />
        </View>
    );
}

export default HomeScreen;
