import { create } from "zustand";
import * as SecureStore from 'expo-secure-store'
import { SESSION_KEY } from "../config/StorageKeys";
import { LoginRequest } from "../models/LoginRequest";
import { SignupRequest } from "../models/SignupRequest";
import { User } from "../dtos/User";
import { authService } from "../services/auth";

interface AuthState {
    user: User | null,
    isLoading: boolean,

    checkAuth: () => Promise<void>,
    login: (loginRequest: LoginRequest) => Promise<void>,
    register: (signupRequest: SignupRequest) => Promise<void>,
    logout: () => Promise<void>,
}

const persistSession = async (user: User) => {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(user));
};

const clearSession = async () => {
    await SecureStore.deleteItemAsync(SESSION_KEY);
};

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,

    checkAuth: async () => {
        try {
            const storedSession = await SecureStore.getItemAsync(SESSION_KEY);

            if (!storedSession) {
                set({ user: null });
                return;
            }

            const user: User = JSON.parse(storedSession);

            if (new Date(user.expiresDate) <= new Date()) {
                await clearSession();
                set({ user: null });
                return;
            }

            set({ user });
        } catch {
            await clearSession();
            set({ user: null });
        } finally {
            set({ isLoading: false });
        }
    },

    login: async (loginRequest : LoginRequest) => {
        const user = await authService.login(loginRequest);
        await persistSession(user);
        set({ user });
    },

    register: async (signupRequest : SignupRequest) => {
        const user = await authService.signup(signupRequest);
        await persistSession(user);
        set({ user });
    },

    logout: async () => {
        await clearSession();
        set({ user: null });
    }

}));

export default useAuthStore;
