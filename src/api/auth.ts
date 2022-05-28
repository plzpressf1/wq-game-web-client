import { AxiosResponse } from "axios";

import $api from "./common";
import { IUser, IGame } from "./games";

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
