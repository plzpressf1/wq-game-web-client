import { AxiosResponse } from "axios";

import $api from "./common";
import { IUser } from "../stores/User";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export async function authLogin(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login", { login, password });
}

export async function authFetchUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>("/users");
}
