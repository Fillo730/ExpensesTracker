import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";

export type AppStackParamList = {
    Home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

function AppStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default AppStack;
