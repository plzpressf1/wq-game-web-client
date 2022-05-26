import axios from "axios";

import { AuthResponse } from "./auth";

export const ApiEndpoint = "http://localhost:4000";
export const WsEndpoint = "ws://localhost:4000";

export const LocalStorageEntryName = "wq-token";

const $api = axios.create({
    withCredentials: true,
    baseURL: ApiEndpoint,
});

$api.interceptors.request.use((config) => {
    // @ts-ignore
    config.headers.Authorization = `Bearer ${localStorage.getItem(LocalStorageEntryName)}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(
                `${ApiEndpoint}/auth/refresh`,
                { withCredentials: true },
            );
            localStorage.setItem(LocalStorageEntryName, response.data.accessToken);
            return $api.request(originalRequest);
        }
        catch (e) {
            console.error(e);
        }
    }
    throw error;
});

export default $api;
