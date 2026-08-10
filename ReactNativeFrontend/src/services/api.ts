import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { SESSION_KEY } from "../config/StorageKeys";
import { ApiResponse } from "../dtos/ApiResponse";
import { User } from "../dtos/User";

const BASE_URL = "http://192.168.1.7:5010/api";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(async (config) => {
    const storedSession = await SecureStore.getItemAsync(SESSION_KEY);

    if (storedSession) {
        const user: User = JSON.parse(storedSession);
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});

api.interceptors.response.use((response) => {
    const body = response.data as ApiResponse<unknown>;

    if (body && typeof body.success === 'boolean') {
        if (!body.success) {
            return Promise.reject(new Error(body.message ?? 'Richiesta non riuscita.'));
        }

        response.data = body.data;
    }

    return response;
});
