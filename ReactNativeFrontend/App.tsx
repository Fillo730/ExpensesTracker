import { useEffect } from "react";
import useAuthStore from "./src/hooks/useAuth";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <RootNavigator />;
}
