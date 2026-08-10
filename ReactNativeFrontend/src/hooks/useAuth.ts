import { create } from "zustand";
import { SESSION_KEY } from "../config/StorageKeys";
import { LoginRequest } from "../models/LoginRequest";
import { SignupRequest } from "../models/SignupRequest";
import { User } from "../dtos/User";
import { authService } from "../services/auth";
import { checkIfExists, clearItem, saveItem } from "./useSecureStore";

interface AuthState {
    user: User | null,
    isLoading: boolean,

    checkAuth: () => Promise<void>,
    login: (loginRequest: LoginRequest) => Promise<void>,
    register: (signupRequest: SignupRequest) => Promise<void>,
    logout: () => Promise<void>,
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,

    checkAuth: async () => {
        try {
            const user = await checkIfExists<User>(SESSION_KEY);

            if (!user) {
                set({ user: null });
                return;
            }

            if (new Date(user.expiresDate) <= new Date()) {
                await clearItem(SESSION_KEY);
                set({ user: null });
                return;
            }

            set({ user });
        } catch {
            await clearItem(SESSION_KEY);
            set({ user: null });
        } finally {
            set({ isLoading: false });
        }
    },

    login: async (loginRequest : LoginRequest) => {
        const user = await authService.login(loginRequest);
        await saveItem<User>(SESSION_KEY, user);
        set({ user });
    },

    register: async (signupRequest : SignupRequest) => {
        const user = await authService.signup(signupRequest);
        await saveItem<User>(SESSION_KEY, user);
        set({ user });
    },

    logout: async () => {
        await clearItem(SESSION_KEY);
        set({ user: null });
    }

}));

export default useAuthStore;
