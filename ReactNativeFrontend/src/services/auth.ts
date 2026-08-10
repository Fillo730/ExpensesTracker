import { User } from "../dtos/User";
import { LoginRequest } from "../models/LoginRequest";
import { SignupRequest } from "../models/SignupRequest";
import { api } from "./api";


export const authService = {
    login : async (loginRequest : LoginRequest) : Promise<User> => {
        const response = await api.post<User>('/auth/login', loginRequest);
        return response.data;
    },

    signup : async (signupRequest : SignupRequest) : Promise<User> => {
        const response = await api.post<User>('/auth/register', signupRequest);
        return response.data;
    }
}
