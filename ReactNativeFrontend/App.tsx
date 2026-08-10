import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useAuthStore from "./src/hooks/useAuth";
import useThemeStore from "./src/hooks/useTheme";
import RootNavigator from "./src/navigation/RootNavigator";
import ThemeToggler from "./src/components/ThemeToggler";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const hydrateTheme = useThemeStore((state) => state.hydrateTheme);

  useEffect(() => {
    checkAuth();
    hydrateTheme();
  }, [checkAuth, hydrateTheme]);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        <ThemeToggler />
      </View>
    </SafeAreaProvider>
  );
}
