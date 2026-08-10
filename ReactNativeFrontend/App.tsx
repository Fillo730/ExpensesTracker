import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./src/i18n";
import useAuthStore from "./src/hooks/useAuth";
import useThemeStore from "./src/hooks/useTheme";
import useLanguageStore from "./src/hooks/useLanguage";
import RootNavigator from "./src/navigation/RootNavigator";
import TopBar from "./src/components/TopBar";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const hydrateTheme = useThemeStore((state) => state.hydrateTheme);
  const hydrateLanguage = useLanguageStore((state) => state.hydrateLanguage);

  useEffect(() => {
    checkAuth();
    hydrateTheme();
    hydrateLanguage();
  }, [checkAuth, hydrateTheme, hydrateLanguage]);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <RootNavigator />
        <TopBar />
      </View>
    </SafeAreaProvider>
  );
}
