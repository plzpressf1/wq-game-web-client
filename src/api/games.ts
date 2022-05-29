import { AxiosResponse } from "axios";

import $api from "./common";

export interface User {
    _id: string;
    name: string;
}

export interface Pack {
    _id: string;
    name: string;
    description: string;
}

export interface Game {
    _id: string;
    name: string;
    host: User;
    pack: Pack;
    playerSlots: number;
    participants: User[];
}

export interface GamesResponse {
    games: Game[];
}

export async function searchGamesByFilter(filter: string): Promise<AxiosResponse<GamesResponse>> {
    return $api.get<GamesResponse>(`/games?filter=${filter}`);
}
