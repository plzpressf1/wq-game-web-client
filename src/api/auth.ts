import { AxiosResponse } from "axios";

import $api from "./common";
import { IUser } from "stores/User";
import { IGame } from "./games";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface FetchUserDataResponse {
    user: IUser;
    game: IGame;
}

export async function authLogin(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>("/auth/login", { login, password });
}

export async function authFetchUser(): Promise<AxiosResponse<FetchUserDataResponse>> {
    return $api.get<FetchUserDataResponse>("/users");
}
